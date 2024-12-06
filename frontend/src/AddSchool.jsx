import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  contact: yup
    .number()
    .typeError("Contact must be a number")
    .required("Contact is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
  image: yup.mixed().required("Image is required"),
});

const AddSchool = () => {
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    formData.append("image", data.image[0]);

    try {
      await axios.post("http://localhost:5000/api/schools", formData);
      alert("School added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add school.");
    }
  };

  return (
    <div>
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="School Name" />
        <p>{errors.name?.message}</p>
        <input {...register("address")} placeholder="Address" />
        <p>{errors.address?.message}</p>
        <input {...register("city")} placeholder="City" />
        <p>{errors.city?.message}</p>
        <input {...register("state")} placeholder="State" />
        <p>{errors.state?.message}</p>
        <input {...register("contact")} placeholder="Contact" />
        <p>{errors.contact?.message}</p>
        <input {...register("email_id")} placeholder="Email" />
        <p>{errors.email_id?.message}</p>
        <input
          type="file"
          {...register("image")}
          onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
        />
        <p>{errors.image?.message}</p>
        {preview && <img src={preview} alt="Preview" />}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSchool;
