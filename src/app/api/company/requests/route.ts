import { NextResponse } from 'next/server';
import CompanyRequest from '@/models/companyRequest';  
import connectToDatabase from '@/lib/dbConnect';  

export async function GET() {
  await connectToDatabase();

  try {
    const companies = await CompanyRequest.find();
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar empresas', error }, { status: 500 });
  }
}