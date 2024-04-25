import Image from 'next/image';
import React, { memo } from "react";

const Loader = () => {
  return (
    <div className="text-center" style={{ paddingTop: "15%" }}>

      <Image src="/loader.svg" alt="Loading..." width={50} height={50} />
    </div>
  );
};

export default memo(Loader);
