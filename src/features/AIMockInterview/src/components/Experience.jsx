import { Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = ({ questionText, onSpeakEnd }) => {
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position={[0, -3, 5]} scale={2} questionText={questionText} onSpeakEnd={onSpeakEnd} />
      <Environment preset="sunset" />
    </>
  );
};
