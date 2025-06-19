import { NextRequest } from "next/server";
import connectMongoDB from "@/lib/dbConnect";
import Offer from "@/models/offer";
import User from "@/models/user";

interface CandidateUser {
  _id: string;
  name: string;
  email: string;
  profile?: {
    role?: string;
    city?: string;
    country?: string;
    phone?: string;
    pfp?: string;
    contactEmail?: string;
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ message: "ID da oferta em falta." }), {
      status: 400,
    });
  }

  try {
    await connectMongoDB();

    const offer = await Offer.findById(id);
    if (!offer || !Array.isArray(offer.candidates)) {
      return new Response(JSON.stringify({ message: "Oferta não encontrada ou sem candidatos." }), {
        status: 404,
      });
    }

    const candidateIds = offer.candidates.map((c: { user: string }) => c.user);
    if (!candidateIds.length) {
      return new Response(JSON.stringify({ candidates: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const users = await User.find(
      { _id: { $in: candidateIds } },
      "name email profile"
    );

    const candidates = users.map((user: CandidateUser) => ({
      _id: user._id,
      name: user.name,
      role: user.profile?.role || "",
      city: user.profile?.city || "",
      country: user.profile?.country || "",
      phone: user.profile?.phone || "",
      email: user.profile?.contactEmail || user.email,
      pfp: user.profile?.pfp || "",
      profileUrl: `https://jethire.pt/profile/${user._id}`,
    }));

    return new Response(JSON.stringify({ candidates }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Erro ao procurar candidatos:", error);
    return new Response(JSON.stringify({ message: "Erro interno do servidor." }), {
      status: 500,
    });
  }
}
