import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      gender: "male",
    },
  });

  const img = watch("img");
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (img && img[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(img[0]);
    } else {
      setPreview(null);
    }
  }, [img]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("isMale", data.gender === "male");
    if (data.img && data.img[0]) {
      formData.append("img", data.img[0]);
    }

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: data.title,
                price: data.price,
                link: data.gender === "male" ? "/men" : "/women",
                img: preview || p.img,
              }
            : p
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/products",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setProducts([...products, res.data]);
      }

      reset();
      setPreview(null);
      setShowForm(false);
    } catch (err) {
      console.error("Hata oluştu:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("gender", product.link === "/men" ? "male" : "female");
    setPreview(product.img);
    setShowForm(true);

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productToDelete}`
      );
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);
    } catch (err) {
      console.error("Silme işlemi başarısız:", err);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Admin Panel</h2>

      <button onClick={() => setShowForm((prev) => !prev)} style={toggleButton}>
        {showForm ? "Kapat" : "Yeni Ürün Ekle"}
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            style={formStyle}
            encType="multipart/form-data"
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <input
              placeholder="Başlık"
              {...register("title", { required: true })}
              style={inputStyle}
            />
            <input
              placeholder="Fiyat"
              type="text"
              {...register("price", { required: true })}
              style={inputStyle}
            />
            <input
              type="file"
              {...register("img", { required: !editingProduct })}
            />
            {preview && (
              <img src={preview} alt="preview" style={previewStyle} />
            )}

            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: true })}
                  style={radioInputStyle}
                />
                Erkek
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: true })}
                  style={radioInputStyle}
                />
                Kadın
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} style={buttonStyle}>
              {editingProduct ? "Güncelle" : "Ekle"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setEditingProduct(null);
                  setPreview(null);
                  setShowForm(false);
                }}
                style={cancelButtonStyle}
              >
                İptal
              </button>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <div style={gridStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.img} alt={product.title} style={cardImgStyle} />
            <h3 style={{ margin: "10px 0" }}>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.link === "/men" ? "Erkek" : "Kadın"}</p>
            <div style={cardButtonGroup}>
              <button
                onClick={() => handleEdit(product)}
                style={editButtonStyle}
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                style={deleteButtonStyle}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Silme Onay Modalı */}
      <AnimatePresence>
        {productToDelete && (
          <motion.div
            style={modalOverlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={modalContentStyle}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h3 style={{ marginBottom: "20px" }}>Emin misiniz?</h3>
              <p>
                Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri
                alınamaz.
              </p>
              <div style={modalButtonGroupStyle}>
                <button onClick={confirmDelete} style={deleteButtonStyle}>
                  Sil
                </button>
                <button onClick={cancelDelete} style={cancelButtonStyle}>
                  İptal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stil tanımları
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "400px",
  width: "100%",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

const modalButtonGroupStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
};

const radioGroupStyle = {
  display: "flex",
  gap: "20px",
  margin: "10px 0",
};

const radioLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  cursor: "pointer",
};

const radioInputStyle = {
  margin: 0,
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  background: "#4caf50",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cancelButtonStyle = {
  background: "#bbb",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginLeft: "10px",
};

const toggleButton = {
  background: "#673ab7",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  marginBottom: "20px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background 0.3s",
};

const editButtonStyle = {
  background: "#2196f3",
  color: "white",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
};

const deleteButtonStyle = {
  background: "#f44336",
  color: "white",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
};

const cardStyle = {
  padding: "15px",
  border: "1px solid #eee",
  borderRadius: "10px",
  background: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
};

const cardImgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
};

const cardButtonGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const formStyle = {
  display: "grid",
  gap: "10px",
  maxWidth: "400px",
  marginBottom: "40px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  background: "linear-gradient(to right, #fdfbfb, #ebedee)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const previewStyle = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "contain",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #eee",
};

export default Dashboard;
