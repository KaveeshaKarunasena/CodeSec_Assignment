import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box } from "@mui/material";

export default function MealDialog({ mealId, open, onClose }) {
  const [mealDetails, setMealDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        setMealDetails(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    if (open && mealId) {
      fetchMealDetails();
    }
  }, [open, mealId]);

  const renderInstructions = () => {
    if (!mealDetails || !mealDetails.strInstructions) return null;
    
    const instructions = mealDetails.strInstructions.split(/\d+\./).filter(Boolean);

    return instructions.map((instruction, index) => (
      <Typography key={index} variant="body1" sx={{ textAlign: "justify" }}>
         <span style={{ fontWeight: "bold" }}>{index + 1}.</span>{' '}
         {instruction.trim()}
      </Typography>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      sx={{
        borderRadius: "16px",
      }}
    >
      {mealDetails && (
        <>
          <DialogTitle sx={{ bgcolor: "#FE5E7F" }}>{mealDetails.strMeal}</DialogTitle>
          <DialogContent sx={{ bgcolor: "#FEF8F9" }}>
            <Box sx={{paddingTop:5, paddingBottom:5}}>
            <img
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              style={{
                width: "50%",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
            </Box>
            <Typography variant="subtitle1">
              <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
              {mealDetails.strCategory}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "justify", fontWeight:'bold',paddingBottom:2 }}>
              Instructions:
            </Typography>
            {renderInstructions(mealDetails.strInstructions)}
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#FEF8F9" }}>
            <Button  variant="contained"
                  sx={{
                    backgroundColor: "#FE5E7F",
                    "&:hover": {
                      backgroundColor: "#FE5E7F",
                    },
                    borderRadius: 0,
                    fontSize: "bold",
                    height: 35,
                  }}onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
