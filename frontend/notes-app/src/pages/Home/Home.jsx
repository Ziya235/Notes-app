import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx";
import AddNotes from "../../assets/add_note.png";
import NoData from "../../assets/no_data.jpg";
import "../../App.css";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error");
    }
  };

  // Delete note

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error");
      }
    }
  };

  //Search a note

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Pinned

  // const updateIsPinned = async (noteData) => {
  //   const noteId = noteData._id;
  //   console.log(noteData);

  //   try {
  //     const response = await axiosInstance.put(
  //       "/update-note-pinned/" + noteId,
  //       {
  //         isPinned: !noteData.isPinned,
  //       }
  //     );

  //     if (response.data && response.data.note) {
  //       // getAllNotes();
  //     }
  //   } catch (error) {
  //     console.log(error);

  //   }
  // };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        getAllNotes={getAllNotes}
      />
      <div className="mx-8">
        <div
          className={`home-cards mt-8 ${
            allNotes.length > 0 ? "grid grid-cols-3 gap-4" : ""
          }`}
        >
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <NoteCard
                key={item._id} // Use a unique key
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {}} // Pass note data
              />
            ))
          ) : (
            <EmptyCard
              onImageClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null });
              }}
              imgSrc={isSearch ? NoData : AddNotes}
              message={
                isSearch
                  ? `Oop's! No notes found matching your search.`
                  : `Start creating your first note! Click the image to
                 upload and jot down your thoughts, ideas, and reminders. Let’s get started! `
              }
            />
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10 shadow-lg"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="add-notes-modal w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
