import useLoading from "../hooks/useLoading";
import { ImSpinner9 } from "react-icons/im";

export default function LoadingIcon() {
  const { showLoad, setShowLoad } = useLoading();

  return (
    <div>
      <button
        onClick={() => setShowLoad((showLoad !== "true").toString())}
        className={`m-2 block ${showLoad !== "true" ? "loading-crossed" : ""}`}
      >
        <ImSpinner9 className="w-5 h-5" />
      </button>
    </div>
  );
}
