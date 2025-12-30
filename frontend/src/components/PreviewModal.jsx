export default function PreviewModal({ open, onClose, type, src }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 10,
          maxWidth: "90%",
          maxHeight: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {type === "image" && (
          <img
            src={src}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}

        {type === "video" && (
          <video
            src={src}
            controls
            autoPlay
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}

        <div style={{ textAlign: "right", marginTop: 5 }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
