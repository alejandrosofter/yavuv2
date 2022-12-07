import {
  Typography,
  Icon,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";

export default function Ayuda({ idPlan }) {
  const { data: ayuda } = useCollection("ayuda", {
    where: ["planes", "array-contains", idPlan],
  });
  if (!ayuda) return "Cargando ayuda";
  const clickLink = (item) => {
    window.open(item.link, "_blank");
  };
  return (
    <>
      <Typography variant="h5" gutterBottom>
        <Icon sx={{ fontSize: 20 }} className="fas fa-video" />
        AYUDA
      </Typography>
      <List dense={true}>
        {ayuda.map((item) => {
          if (item.planes.includes(idPlan))
            return (
              <ListItem
                key={item.nro}
                secondaryAction={
                  <IconButton
                    onClick={clickLink.bind(this, item)}
                    aria-label="go"
                    edge="end"
                  >
                    <Icon className="fas fa-video" />
                  </IconButton>
                }
              >
                <ListItemText primary={item.titulo} secondary={item.detalle} />
              </ListItem>
            );
        })}
      </List>
    </>
  );
}
