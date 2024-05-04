import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useContext, memo, useState } from "react";
import { useAuth } from "../../utils/context/authContext";
import PawsImage from "../../assets/paws.jpeg";

const adopt = "Adopt";
const edit = "Edit";
const chippedLabel = "CHIPPED";
const adoptedLabel = "ADOPTED";

const memoizedAnimalCard = memo(function AnimalCard({
  name,
  description,
  image,
  isAdopted,
  isChipped,
  adoptedBy,
  onEdit,
  onAdopt,
}) {
  const [raised, setRaised] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <Card
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      sx={{
        width: 345,
        maxWidth: 345,
        minWidth: 345,
        height: 415,
        minHeight: 415,
        maxHeight: 415,
      }}
    >
      <CardMedia
        component="img"
        alt={name}
        height="240"
        image={image || PawsImage}
      />
      <CardContent
        sx={{
          pt: 2,
          pb: 0,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          bgcolor: isAdopted ? "secondary.main" : "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {isChipped && (
            <Chip
              label={chippedLabel}
              size="small"
              variant="outlined"
              color="info"
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
              }}
            />
          )}
          {isAdopted && (
            <Chip
              label={adoptedLabel}
              size="small"
              variant="outlined"
              color="info"
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
              }}
            />
          )}
        </Box>
      </CardContent>
      <CardContent sx={{ pt: 0, pb: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 62,
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", minHeight: 47 }}>
        {adoptedBy && <Typography variant="body2" sx={{marginRight:"auto"}}>Adopted by:{adoptedBy.email}</Typography>}
        {!isAdopted && (
          <Button
            variant="contained"
            size="small"
            disabled={isAdopted}
            onClick={onAdopt}
            color={isAdopted ? "secondary" : "primary"}
          >
            {adopt}
          </Button>
        )}
        {isAdmin && (
          <Button
            variant="contained"
            size="small"
            onClick={onEdit}
            color={isAdopted ? "secondary" : "primary"}
          >
            {edit}
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

export default memoizedAnimalCard;
