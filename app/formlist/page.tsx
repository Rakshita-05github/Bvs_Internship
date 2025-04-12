"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Create() {
  const [forms, setForms] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/form");
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/form/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setForms((prev: any) => ({
          ...prev,
          forms: prev.forms.filter((form: any) => form._id !== id),
        }));
      } else {
        console.error("Failed to delete form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <main>
      <Navbar />
      <main className="grid place-items-center px-7 mx-auto w-full max-w-3xl">
        {loading && <main>Loading.....</main>}
        {!loading && forms && (
          <ul className="w-full">
            <div className="text-center font-extrabold text-[#2f6d9a] py-10 text-3xl">
              All Forms
            </div>
            {forms.forms.map((form: any, idx: number) => {
              return (
                <li
                  className="list-decimal flex justify-between items-center border-b border-gray-200 py-3 w-full my-1 px-5"
                  key={form._id}
                >
                  <span className="capitalize">
                    {idx + 1}. &nbsp; {form.title}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={`/form/${form._id}`}
                      className="text-sm lowercase hover:underline hover:underline-offset-4 text-blue-700 cursor-pointer"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="text-sm text-red-600 hover:underline hover:underline-offset-4"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </main>
  );
}
