import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="p-4">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default loading;
