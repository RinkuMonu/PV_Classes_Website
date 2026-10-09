import { Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = ({ avatarState, avatarBehavior }) => {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls enableZoom={false} />
      <Avatar position={[0, -3, 5]} scale={2} avatarState={avatarState} avatarBehavior={avatarBehavior} />
      <Environment preset="sunset" />
    </>
  );
};
