"use client";

import NextTopLoader from "nextjs-toploader";

export default function LoadingBar() {
  return (
    <NextTopLoader
      color="#3d8183"
      height={3}
      showSpinner={false}
      shadow="0 0 10px #3d8183, 0 0 5px #3d8183"
    />
  );
}
