'use client'
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {      
    router.push(`/login?type=student`)
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
