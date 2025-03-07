"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Button type="primary" onClick={() => router.push("/login")} style={{ marginBottom: "10px" }}>
        Login
      </Button>
      <Button type="default" onClick={() => router.push("/register")}>
        Register
      </Button>
    </div>
  );
}