import { LoaderCircle } from "lucide-react";

function LoaderComponent() {
  return (
    <div className="w-full h-full flex justify-center items-center fixed">
      <LoaderCircle size={96} className="animate-spin" />
    </div>
  );
}

export default LoaderComponent;
