import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      company_name,
      registration_number,
      contact_person,
      phone,
      website,
      address,
      product_categories,
    } = body;

    const newSeller = await db.seller.create({
      data: {
        company_name,
        registration_number,
        contact_person,
        phone,
        website,
        address,
        product_categories,
      },
    });

    return NextResponse.json(newSeller, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating seller:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error creating seller:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}
