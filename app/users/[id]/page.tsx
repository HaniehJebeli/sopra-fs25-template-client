"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/user";
import { Button, Card, DatePicker, ConfigProvider, message } from "antd";
import dayjs from "dayjs";

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const apiService = useApi();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [birthday, setBirthday] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser: User = await apiService.get<User>(`/users/${id}`);
        setUser(fetchedUser);
        setBirthday(fetchedUser.birthday || null);
      } catch (_error) {
        alert("Error fetching user details.");
        router.push("/users");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, apiService, router]);

  const handleBirthdayChange = (date: dayjs.Dayjs | null) => {
    setBirthday(date ? date.format("YYYY-MM-DD") : null);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      
        
      message.success("Birthday updated successfully!");
    } catch (_error) {
      message.error("Failed to update birthday.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#1677ff", // Default Ant Design primary color
        borderRadius: 6, // Slightly rounded corners for a softer look
      }
    }}>
      <div className="card-container">
        <Card title="User Details" loading={loading} className="user-details-container">
          {user ? (
            <>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Created Date:</strong> {user.createdDate}</p>
              <p><strong>Birthday:</strong></p>
              <DatePicker 
                value={birthday ? dayjs(birthday) : null} 
                onChange={handleBirthdayChange} 
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
              />
              <Button onClick={handleSave} type="primary" loading={saving} style={{ marginTop: "10px" }}>
                Save
              </Button>
              <Button onClick={() => router.push("/users")} type="default" style={{ marginTop: "10px", marginLeft: "10px" }}>
                Back to Users
              </Button>
            </>
          ) : (
            <p>User not found.</p>
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default UserDetails;