"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../components/FormInput";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Select from "../components/Select";
import Link from "next/link";
import { createPatient, findPatients } from "../database/handlers/patient";

const Register = () => {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    // setLoading(true);
    let {
      name,
      email,
      address,
      phone,
      gender,
      dob,
      bloodGroup,
      password,
      confirmPassword,
    } = e.target;
    let data = [];

    data = {
      name: name.value.trim(),
      email: email.value.trim(),
      address: address.value.trim(),
      phone: phone.value.trim(),
      gender: gender.value.trim(),
      dob: new Date(dob.value.trim()),
      bloodGroup: bloodGroup.value.trim(),
      password: password.value,
    };
    const findPatient = JSON.parse(
      await findPatients({ email: email.value.trim() })
    );
    console.log(findPatient);

    //Form Validation
    if (findPatient.response.length !== 0) {
      toast.error("User with this email already exists...Try logging in");
    } else if (password.value != confirmPassword.value) {
      toast.error("The passwords doesn't match");
    } else {
      const response = await createPatient(data);
      console.log(response);
      toast.success(response);
    }

    setLoading(false);
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-1 my-20">
      <div className="w-10/12 sm:w-3/5 md:w-4/5 lg:2/3 ">
        <form
          className="flex flex-col bg-white px-5 py-2 rounded-lg shadow-xl border border-writing/10"
          onSubmit={handleSubmit}
        >
          <h2 className=" font-bold text-primary text-center my-5 text-lg md:text-xl lg:text-2xl">
            Create an account with us today
          </h2>
          <div className="flex flex-col gap-y-2">
            <div className="grid md:grid-cols-2 gap-x-5 items-center">
              <FormInput title={"Full Name"} id={"name"} />
              <FormInput title={"Email Address"} id={"email"} type={"email"} />
            </div>
            <div className="grid md:grid-cols-2 gap-x-5 items-center">
              <FormInput title={"Phone Number"} id={"phone"} type={"tel"} />
              <FormInput title={"Home Address"} id={"address"} />
              <Select
                id={"gender"}
                title="Gender"
                options={["Male", "Female"]}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-x-5 items-center">
              <FormInput title={"Date Of Birth"} id={"dob"} type={"date"} />
              <Select
                id={"bloodGroup"}
                title="Blood Group"
                options={["A", "B", "AB", "O"]}
              />
            </div>
            <FormInput title={"Password"} id={"password"} type={"password"} />
            <FormInput
              title={"Confirm Password"}
              id={"confirmPassword"}
              type={"password"}
              required={false}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary text-white ${
              loading && "!bg-gray-300 border-0 text-black"
            } mb-5 mt-8`}
            disabled={loading}
          >
            {loading ? "Hold On" : "Submit"}
          </button>
          <p className="text-sm text-center py-3">
            Already have an account? Login{" "}
            <Link href={"/login"} className="link link-primary">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
