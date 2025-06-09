import React, { useState, useEffect, useRef } from "react";
import Contact from "./Contact";
import {
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  Download,
  Briefcase,
  Contact2,
  User,
  Edit3,
  Check,
  X,
  Camera,
} from "lucide-react";
import {userAvatarUpload} from "../../hooks/AvatarAdd";
import { useAuth } from "../../authContext/AuthContext";

const profileimg = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAgBAQAAPwDZdkBZcF9cLGV/vunNQjmEFpI+6K+YN"; // placeholder image

// Default profile data to fall back to if profileFetch returns nothing
const defaultProfileData = {
  name: "I'm Vignesh Reddy",
  description: "Student and Developer", 
  username: "vigneshreddy7",
  age: "21",
  address: "Ongole, Prakasam, Andhra Pradesh",
  email: "vignesh@gmail.com",
  phone: "+91 93XXXXXXXX",
  role: "Premium",
  avatar: profileimg
};

export default function Account() {
  const [editingField, setEditingField] = useState(null);
  const {profileUpdate, profileFetch, profileDetails} = useAuth();
  const {uploadAvatar} = userAvatarUpload(profileDetails?.id);
  const [profileData, setProfileData] = useState(null); // Start with null
  const [isLoading, setIsLoading] = useState(true);
  const [tempValue, setTempValue] = useState("");
  const fileInputRef = useRef(null);

  const profileFields = [
    { key: "username", icon: <User size={18} />, label: "USERNAME" },
    { key: "age", icon: <Clock size={18} />, label: "AGE" },
    { key: "address", icon: <MapPin size={18} />, label: "ADDRESS" },
    { key: "email", icon: <Mail size={18} />, label: "E-MAIL" },
    { key: "phone", icon: <Phone size={18} />, label: "PHONE" },
    { key: "role", icon: <Briefcase size={18} />, label: "ROLE" },
  ];

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await profileFetch();
        
        if (data && Object.keys(data).length > 0) {
          // Use fetched data and fill in missing fields with defaults
          setProfileData({
            ...defaultProfileData,
            ...data,
            avatar: data.avatar || defaultProfileData.avatar 
          });
        } else {
          // No data returned, use default data
          setProfileData(defaultProfileData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // On error, fall back to default data
        setProfileData(defaultProfileData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileFetch]);

  const handleSave = async (field) => {
    try {
      setProfileData(prev => ({
        ...prev,
        [field]: tempValue
      }));
      
      await profileUpdate({ [field]: tempValue });
      
      setEditingField(null);
      setTempValue("");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (show toast, etc.)
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const updatedUser = await uploadAvatar(file);
        if (updatedUser && updatedUser.avatar) {
          setProfileData(prev => ({
            ...prev,
            avatar: updatedUser.avatar
          }));
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleNameEdit = async (field) => {
    try {
      setProfileData(prev => ({
        ...prev,
        [field]: tempValue
      }));
      
      await profileUpdate({ [field]: tempValue });
      setEditingField(null);
      setTempValue("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Show loading state while fetching
  if (isLoading || !profileData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center relative py-8 px-4">
      <div className="w-full max-w-6xl">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 items-center lg:mt-20">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div 
              className="relative overflow-hidden rounded-md h-72 md:h-full group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                  <Camera size={24} className="text-gray-800" />
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="relative inline-block bg-[#2B2B2B] text-white text-xs font-medium px-4 py-2 rounded-md mb-4">
              HELLO
              <div className="absolute -bottom-2 left-3 w-0 h-0 border-t-8 border-t-[#2B2B2B] border-x-8 border-x-transparent"></div>
            </div>

            <div className="group relative mb-3">
              {editingField === 'name' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleNameEdit('name')}
                    className="text-green-600 hover:text-green-700 p-1"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                    {profileData.name}
                  </h2>
                  <button
                    onClick={() => handleEdit('name', profileData.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700 p-1"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Editable Description */}
            <div className="group relative mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              {editingField === 'description' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => handleNameEdit('description')}
                    className="text-green-600 hover:text-green-700 p-1"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    {profileData.description}
                  </p>
                  <button
                    onClick={() => handleEdit('description', profileData.description)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700 p-1"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-sm">
              {profileFields.map(({ key, icon, label }) => (
                <div key={key} className="flex items-start gap-3 group">
                  <div className="flex items-center text-gray-800 dark:text-gray-300 mt-1">
                    {icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-500 dark:text-gray-400">
                      {label}
                    </div>
                    {editingField === key ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="text-gray-800 dark:text-gray-200 bg-transparent border-b-2 border-blue-500 focus:outline-none flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSave(key)}
                          className="text-green-600 hover:text-green-700 p-1"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="text-gray-800 dark:text-gray-200">
                          {profileData[key]}
                        </div>
                        <button
                          onClick={() => handleEdit(key, profileData[key])}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700 p-1"
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Contact/>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-[#F5F5F5] dark:bg-[#2C2C2C] py-4 px-6 flex flex-wrap justify-center gap-6">
        {[Twitter, Facebook, Linkedin, Instagram].map((Icon, idx) => (
          <Icon
            key={idx}
            size={20}
            className="text-black dark:text-white hover:text-blue-400 cursor-pointer transition-transform hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
}