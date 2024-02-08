import { useNavigate } from "react-router-dom";

export const MenuButton = ({ route, name }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(route)} style={{ marginInline: "2px" }}>
      {name}
    </button>
  );
};
