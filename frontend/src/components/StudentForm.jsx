import { useEffect, useState } from "react";
import api from "../api";

export default function StudentForm({ edit, clear, reload }) {
  const [name, setName] = useState("");
  const [cls, setCls] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setCls(edit.class);
    }
  }, [edit]);

  const submit = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("class", cls);
    if (photo) fd.append("photo", photo);
    if (video) fd.append("video", video);

    if (edit) await api.put(`/students/${edit.id}`, fd);
    else await api.post("/students", fd);

    cancel();
    reload();
  };

  const cancel = () => {
    setName(""); setCls(""); setPhoto(null); setVideo(null);
    clear();
  };

  return (
    <>
      <div className="form-row">Name: <input value={name} onChange={e=>setName(e.target.value)} /></div>
      <div className="form-row">Class: <input value={cls} onChange={e=>setCls(e.target.value)} /></div>
      <div className="form-row">Photo:
        <input type="file" accept="image/png,image/jpeg" onChange={e=>setPhoto(e.target.files[0])} />
      </div>
      <div className="form-row">Video:
        <input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])} />
      </div>
      <button onClick={submit}>Save</button>
      <button onClick={cancel}>Cancel</button>
    </>
  );
}
