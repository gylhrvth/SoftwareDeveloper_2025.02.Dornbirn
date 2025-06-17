// app/country/[slug]/edit/actions.ts
"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";

export async function addLanguage(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const languageName = formData.get('languageName') as string;
  const languagePercentage = parseFloat(formData.get('languagePercentage') as string);
  
  if (!countryCode || !languageName || isNaN(languagePercentage)) {
    throw new Error('Invalid form data');
  }
  
  try {
    await pool.query(
      'INSERT INTO language (Country, Name, Percentage) VALUES (?, ?, ?)',
      [countryCode, languageName, languagePercentage]
    );
    
    // Refresh the data on both pages
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
   
  } catch (error) {
    console.error('Failed to add language:', error);
    throw new Error('Failed to add language');
  }
   // Redirect back to country page
    redirect(`/country/${countryName}`);
}

export async function removeLanguage(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const languageName = formData.get('languageName') as string;
  
  if (!countryCode || !languageName) {
    throw new Error('Invalid form data');
  }
  
  try {
    // Delete the language record
    await pool.query(
      'DELETE FROM language WHERE Country = ? AND Name = ?',
      [countryCode, languageName]
    );
    
    // Refresh the data
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to remove language from database');
  }
  
  // Redirect back to edit page
  redirect(`/country/${countryName}/edit`);
}

export async function addReligion(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const religionName = formData.get('religionName') as string;
  const religionPercentage = parseFloat(formData.get('religionPercentage') as string);
  
  if (!countryCode || !religionName || isNaN(religionPercentage)) {
    throw new Error('Invalid form data');
  }
  
  try {
    await pool.query(
      'INSERT INTO religion (Country, Name, Percentage) VALUES (?, ?, ?)',
      [countryCode, religionName, religionPercentage]
    );
    
    // Refresh the data on both pages
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
    // Redirect back to country page
    redirect(`/country/${countryName}`);
  } catch (error) {
    console.error('Failed to add religion:', error);
    throw new Error('Failed to add religion');
  }
}

export async function removeReligion(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const religionName = formData.get('religionName') as string;
  
  if (!countryCode || !religionName) {
    throw new Error('Invalid form data');
  }
  
  try {
    // Delete the religion record
    await pool.query(
      'DELETE FROM religion WHERE Country = ? AND Name = ?',
      [countryCode, religionName]
    );
    
    // Refresh the data
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to remove religion from database');
  }
  
  // Redirect back to edit page
  redirect(`/country/${countryName}/edit`);
}