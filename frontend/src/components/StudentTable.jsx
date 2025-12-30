import { useState } from "react";
import api from "../api";
import SortableHeader from "./SortableHeader";
import PreviewModal from "./PreviewModal";

export default function StudentTable({
  data,
  onEdit,
  reload,
  sortBy,
  order,
  onSort,
}) {
  const [preview, setPreview] = useState({
    open: false,
    type: "",
    src: "",
  });

  const openPreview = (type, src) => {
    setPreview({ open: true, type, src });
  };

  const closePreview = () => {
    setPreview({ open: false, type: "", src: "" });
  };

  const del = async (id) => {
    await api.delete(`/students/${id}`);
    reload();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <SortableHeader label="Name" column="name" {...{ sortBy, order, onSort }} />
            <SortableHeader label="Class" column="class" {...{ sortBy, order, onSort }} />
            <th>Photo</th>
            <th>Video</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => {
            const photoUrl = s.photo_path
              ? `http://localhost:4000/uploads/${s.photo_path}`
              : null;

            const videoUrl = s.video_path
              ? `http://localhost:4000/uploads/${s.video_path}`
              : null;

            return (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.class}</td>

                {/* PHOTO PREVIEW */}
                <td>
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="thumb"
                      width="40"
                      style={{ cursor: "pointer" }}
                      onClick={() => openPreview("image", photoUrl)}
                    />
                  ) : (
                    "-"
                  )}
                </td>

                {/* VIDEO PREVIEW */}
                <td>
                  {videoUrl ? (
                    <button onClick={() => openPreview("video", videoUrl)}>
                      ▶ Preview
                    </button>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <button onClick={() => onEdit(s)}>Edit</button>
                  <button onClick={() => del(s.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* PREVIEW MODAL */}
      <PreviewModal
        open={preview.open}
        type={preview.type}
        src={preview.src}
        onClose={closePreview}
      />
    </>
  );
}
