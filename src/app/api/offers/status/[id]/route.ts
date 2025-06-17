import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Offer from "@/models/offer";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;
  const body = await req.json();

  try {
    const updatedOffer = await Offer.findByIdAndUpdate(id, { isActive: body.isActive }, { new: true });

    if (!updatedOffer) {
      return NextResponse.json({ message: "Oferta não encontrada" }, { status: 404 });
    }

    return NextResponse.json(updatedOffer, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar a oferta:", error);
    return NextResponse.json({ message: "Erro ao atualizar a oferta" }, { status: 500 });
  }
}
