import useLoading from "../hooks/useLoading";
import { ImSpinner9 } from "react-icons/im";
import { BsXOctagon } from "react-icons/bs";

export default function LoadingIcon() {
  const { showLoad, setShowLoad } = useLoading();

  return (
    <div>
      <button
        onClick={() => setShowLoad((showLoad !== "true").toString())}
        className="m-2 block"
      >
        {showLoad === "true" ? (
          <ImSpinner9 className="w-5 h-5" />
        ) : (
          <BsXOctagon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
