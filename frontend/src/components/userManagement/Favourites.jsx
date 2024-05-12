import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Favorite from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import axios from "axios";
import MealDialog from "./MealDialog";
import { AuthContext } from "../../auth/AuthProvide";

export default function Favourite() {
  const {user} = React.useContext(AuthContext);
    const [meals, setMeals] = React.useState([]);
    const [favoriteMap, setFavoriteMap] = React.useState({});
    const [selectedMealId, setSelectedMealId] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const token = user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    React.useEffect(() => {
      const url = "http://localhost:8080/api/v1/meals/get/fevourite";
      const fetchApiData = async () => {
        try {
          const response = await axios.get(url,config);
          console.log(response.data)
          setMeals(response.data)
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchApiData();
    }, []);
  
    const handleFavoriteClick = async (index, event) => {
      event.stopPropagation();
      const mealId = meals[index].idMeal;
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/meals/remove/fevourite/${mealId}`,
      null,
      config
    );
    console.log(response.data);
    setMeals((prevMeals) => prevMeals.filter((meal, i) => i !== index));
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
    };
  
    const handleCardClick = (mealId) => {
      setSelectedMealId(mealId);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedMealId(null);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#FEF8F9",
          paddingTop: 5,
          overflowX: "hidden",
        }}
      >
        <Box sx={{ marginLeft: 5, marginRight: 5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {meals.map((meal, index) => (
              <Card
                key={index}
                variant="plain"
                sx={{
                  width: "100%",
                  bgcolor: "initial",
                  p: 0,
                  borderRadius: 24,
                }}
                onClick={() => handleCardClick(meal.idMeal)}
              >
                <Box sx={{ position: "relative" }}>
                  <AspectRatio ratio="4/3">
                    <figure>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </figure>
                  </AspectRatio>
                  <CardCover
                    className="gradient-cover"
                    sx={{
                      "&:hover, &:focus-within": {
                        opacity: 1,
                      },
                      opacity: 0,
                      transition: "0.1s ease-in",
                      background:
                        "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
                    }}
                  ></CardCover>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    level="body-xs"
                    sx={{ fontWeight: "md", color: "text.secondary" }}
                  >
                    {meal.strMeal}
                  </Typography>
                  <IconButton
                    size="sm"
                    variant="solid"
                    sx={{
                      ml: 1,
                      color: favoriteMap[index] ? "#808080" : "#FE5E7F",
                      borderColor: favoriteMap[index] ? "#FE5E7F" : "#FE5E7F",
                      background: "transparent",
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                    onClick={(event) => handleFavoriteClick(index, event)}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
        <MealDialog
          mealId={selectedMealId}
          open={openDialog}
          onClose={handleCloseDialog}
        />
      </Box>
    );
  }