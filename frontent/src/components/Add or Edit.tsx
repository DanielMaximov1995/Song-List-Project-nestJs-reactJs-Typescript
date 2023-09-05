import { Song } from "../types/Type";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { BoxForm, ButtonStyled } from "./Styled Components";
import toast from "react-hot-toast";
import { fetchAddSong, fetchDeleteSong, fetchUpdateSong } from "../features/songs/songsThunks";
import { useDispatch } from "react-redux";

interface AddOrEditProps {
  handleOpen: () => void;
  open: boolean;
  data: Song;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}

const AddOrEdit = (props: AddOrEditProps) => {
  const { handleOpen, open, data, handleChange, editable } = props;
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!data.songName || !data.band || !data.year) {
      return toast.error('Do not leave blank fields...')
    }

    // Use toast.promise to show loading, success, or error messages
    toast.promise(
      editable
        ? dispatch(fetchUpdateSong(data) as any) // Dispatch update action if in edit mode
        : dispatch(fetchAddSong(data) as any),  // Dispatch add action if in add mode
      {
        loading: "Saving...",
        success: () => {
          handleOpen(); // Close the dialog on success
          return "The song was successfully saved!";
        },
        error: "Error saving the song !",
      }
    );
  };

  // Function to handle song deletion
  const handleDelete = () => {
    toast.promise(
      dispatch(fetchDeleteSong(data.id ?? -1) as any),
      {
        loading: "Deleted...",
        success: () => {
          handleOpen();
          return "The song was successfully Deleted!";
        },
        error: "Error delete the song !",
      }
    )
  };

  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: "center" }}>{"Add New Song"}</DialogTitle>
      <BoxForm onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          name="songName"
          value={data.songName || ""}
          fullWidth
          label="Song Name"
          variant="outlined"
          sx={{ my: 1 }}
        />
        <TextField
          onChange={handleChange}
          name="band"
          value={data.band || ""}
          fullWidth
          label="Band"
          variant="outlined"
          sx={{ my: 1 }}
        />
        <TextField
          onChange={handleChange}
          name="year"
          value={data.year || ""}
          fullWidth
          label="Year"
          type="number"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <ButtonStyled
          sx={{ my: 1 }}
          type="submit"
          fullWidth={true}
          regular={true}
          variant="success"
        >
          Save Song
        </ButtonStyled>
        {editable ? (
          // Button to delete the song (visible only in edit mode)
          <ButtonStyled
            type="button"
            fullWidth={true}
            regular={true}
            variant="error"
            onClick={handleDelete}
          >
            Delete Song
          </ButtonStyled>
        ) : null}
      </BoxForm>
    </Dialog>
  );
};

export default AddOrEdit;
