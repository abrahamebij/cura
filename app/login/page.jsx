"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../components/FormInput";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Select from "../components/Select";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const selectRef = useRef();

  function handleChange() {
    setSelectedValue(selectRef.current.value);
  }
  useEffect(() => {
    setSelectedValue(selectRef.current.value);
  }, []);

  async function handleSubmit(e) {
    // setLoading(true);
    e.preventDefault();
    let { portal, email, password } = e.target;
    [portal, email, password] = [
      portal.value,
      email.value.trim(),
      password.value,
    ];
    let data = { email, password };
    if (portal === "none") {
      toast.error("Please select the type of portal you want to login to");
      setLoading(false);
    } else if (portal === "patient") {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          ...data,
        });
        if (result?.error) {
          toast.error(result?.error);
        } else {
          toast.success("Logged in successfully");
          router.push("/patient");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (portal === "staff") {
      if (password === "choi102") {
        // localStorage.setItem({ staffId: "staff_001" });
        localStorage.setItem("staffId", "staff_001");
        toast.success("Logged in successfully to Dr. Choi's account");
        router.push("/staff");
      } else if (password === "sarahSmith2") {
        localStorage.setItem("staffId", "staff_002");
        toast.success("Logged in successfully to Dr. Sarah's account");
        router.push("/staff");
      } else {
        toast.error("Wrong password!!! Enter the password specified");
      }
    }
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-1 my-20">
      <div className="w-10/12 md:w-3/5 lg:w-2/5 ">
        <form
          className="flex flex-col bg-white px-3 py-2 rounded shadow-xl border border-writing/10"
          onSubmit={handleSubmit}
        >
          <h2 className=" font-bold text-primary text-center my-5 text-lg md:text-xl lg:text-2xl">
            Login to your Account
          </h2>
          <div className="flex flex-col gap-y-2">
            <Select
              id={"portal"}
              title="Select Portal to log in to:"
              options={["Patient Portal", "Staff Portal"]}
              selectRef={selectRef}
              onChange={handleChange}
            />

            <FormInput
              title={"Email Address"}
              id={"email"}
              type={"email"}
              required={true}
              texts={
                selectedValue === "staff"
                  ? ["Enter in a random email....doesn't matter"]
                  : ["Enter the email you used to register"]
              }
            />
            <FormInput
              title={"Password"}
              id={"password"}
              type={"password"}
              texts={
                selectedValue === "staff"
                  ? [
                      'Type "choi102" to log in to Dr.Choi\'s account',
                      'Type "sarahSmith2" to log in to Dr.Sarah\'s account',
                    ]
                  : [
                      'If you don\'t remember your password, just register again because there is no option for "forgot password"',
                    ]
              }
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary text-white ${
              loading && "!bg-gray-300 border-0 text-black"
            } mb-5 mt-8`}
            disabled={loading}
          >
            {loading ? "Hold On" : "Login"}
          </button>
          <p className="text-sm text-center py-3">
            New patients can register{" "}
            <Link href={"/register"} className="link link-primary">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
