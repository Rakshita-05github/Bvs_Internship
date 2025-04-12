"use client";

import Nav from "@/components/Navbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  setTitle,
  setDesc,
  setActiveQuestionIndex,
} from "@/redux/formSlice";
import Question from "./Question";
import Edit from "./Edit";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const Form = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.form.title);
  const description = useSelector((state: RootState) => state.form.desc);
  const questions = useSelector((state: RootState) => state.form.questions);
  const activeQuestionIndex = useSelector(
    (state: RootState) => state.form.activeQuestionIndex
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTitleChange = (e: any) => {
    e.preventDefault();
    dispatch(setTitle(e.target.value));
  };

  const handleDescChange = (e: any) => {
    e.preventDefault();
    dispatch(setDesc(e.target.value));
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleDeleteQuestion = (index: number) => {
    dispatch(deleteQuestion(index));
  };

  const handleQuestionClick = (index: number) => {
    dispatch(setActiveQuestionIndex(index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formdata = { title, description, questions };
      const response = await fetch("/api/form", {
        method: "POST",
        body: JSON.stringify(formdata),
      });
      if (response.ok) {
        router.push("/formlist");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-4">
            <input
              type="text"
              onChange={handleTitleChange}
              value={title ?? ""}
              required
              placeholder="Form Title"
              className="text-3xl font-bold w-full border-b-2 focus:border-[#29A0B1] outline-none placeholder-gray-400"
            />
            <input
              type="text"
              onChange={handleDescChange}
              value={description ?? ""}
              required
              placeholder="Form Description"
              className="text-base font-medium w-full border-b-2 focus:border-[#29A0B1] outline-none placeholder-gray-400"
            />
          </div>

          {questions.length === 0 && (
            <Edit
              handleAdd={handleAddQuestion}
              show
              handleDelete={() => handleDeleteQuestion(questions.length - 1)}
            />
          )}

          <div className="space-y-6">
            {questions.map((question, index) => (
              <Question
                onclick={() => handleQuestionClick(index)}
                key={index}
                index={index}
                value={question}
                addQuestion={handleAddQuestion}
                handleDelete={() => handleDeleteQuestion(index)}
                isActiveQuestion={index === activeQuestionIndex}
              />
            ))}
          </div>

          {questions.length > 0 && (
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#29A0B1] hover:bg-[#208491] transition-colors duration-200 text-white font-semibold px-8 py-3 rounded-full shadow-md"
              >
                {loading ? "Processing..." : "Save Form"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
