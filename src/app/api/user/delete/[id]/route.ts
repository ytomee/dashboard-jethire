import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/logEvent";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "jethire-admin") {
    return NextResponse.json({ message: "Acesso não autorizado" }, { status: 401 });
  }

  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Utilizador não encontrado" }, { status: 404 });
    }

    await logEvent({
      message: `O utilizador "${deleted.name}" (${deleted.email}) foi removido.`,
      type: "admin",
      userId: session.user.id,
      level: "warn",
    });

    return NextResponse.json({ message: "Utilizador removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover utilizador:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
