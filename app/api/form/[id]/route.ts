import { connect } from "@/utils/mongo";
import Form from "@/utils/models/Form";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const deletedForm = await Form.findByIdAndDelete(params.id);

    if (!deletedForm) {
      return NextResponse.json({ success: false, message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Form deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting form:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
