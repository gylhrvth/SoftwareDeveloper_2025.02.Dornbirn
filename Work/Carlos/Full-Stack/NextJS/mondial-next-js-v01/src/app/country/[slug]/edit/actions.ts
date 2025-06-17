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
    // Check if language already exists for this country
    const [existingLanguages] = await pool.query(
      'SELECT * FROM language WHERE Country = ? AND Name = ?',
      [countryCode, languageName]
    );
    
    if (Array.isArray(existingLanguages) && existingLanguages.length > 0) {
      // Language exists, so update the percentage
      await pool.query(
        'UPDATE language SET Percentage = ? WHERE Country = ? AND Name = ?',
        [languagePercentage, countryCode, languageName]
      );
    } else {
      // Language doesn't exist, so insert a new record
      await pool.query(
        'INSERT INTO language (Country, Name, Percentage) VALUES (?, ?, ?)',
        [countryCode, languageName, languagePercentage]
      );
    }
    
    // Refresh the data
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Failed to add/update language:', error);
    throw new Error(`Failed to add/update language: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // Redirect back to country page
  redirect(`/country/${countryName}/edit`);
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

export async function updateLanguage(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const originalName = formData.get('originalName') as string;
  const languageName = formData.get('languageName') as string;
  const languagePercentage = parseFloat(formData.get('languagePercentage') as string);
  
  if (!countryCode || !originalName || !languageName || isNaN(languagePercentage)) {
    throw new Error('Invalid form data');
  }
  
  try {
    // If name changed, we need to delete the old record and insert a new one
    // (assuming the primary key is a combination of Country and Name)
    if (originalName !== languageName) {
      // First delete the old record
      await pool.query(
        'DELETE FROM language WHERE Country = ? AND Name = ?',
        [countryCode, originalName]
      );
      
      // Then insert the new one
      await pool.query(
        'INSERT INTO language (Country, Name, Percentage) VALUES (?, ?, ?)',
        [countryCode, languageName, languagePercentage]
      );
    } else {
      // Just update the percentage
      await pool.query(
        'UPDATE language SET Percentage = ? WHERE Country = ? AND Name = ?',
        [languagePercentage, countryCode, languageName]
      );
    }
    
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Failed to update language:', error);
    throw new Error(`Failed to update language: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // No redirect - we'll handle this client-side
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
    // Check if religion already exists for this country
    const [existingReligions] = await pool.query(
      'SELECT * FROM religion WHERE Country = ? AND Name = ?',
      [countryCode, religionName]
    );
    
    if (Array.isArray(existingReligions) && existingReligions.length > 0) {
      // Religion exists, so update the percentage
      await pool.query(
        'UPDATE religion SET Percentage = ? WHERE Country = ? AND Name = ?',
        [religionPercentage, countryCode, religionName]
      );
    } else {
      // Religion doesn't exist, so insert a new record
      await pool.query(
        'INSERT INTO religion (Country, Name, Percentage) VALUES (?, ?, ?)',
        [countryCode, religionName, religionPercentage]
      );
    }
    
    // Refresh the data
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Failed to add/update religion:', error);
    throw new Error(`Failed to add/update religion: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // Redirect back to country page
  redirect(`/country/${countryName}/edit`);
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

export async function updateReligion(formData: FormData) {
  const countryCode = formData.get('countryCode') as string;
  const countryName = formData.get('countryName') as string;
  const originalName = formData.get('originalName') as string;
  const religionName = formData.get('religionName') as string;
  const religionPercentage = parseFloat(formData.get('religionPercentage') as string);
  
  if (!countryCode || !originalName || !religionName || isNaN(religionPercentage)) {
    throw new Error('Invalid form data');
  }
  
  try {
    // If name changed, we need to delete the old record and insert a new one
    if (originalName !== religionName) {
      // First delete the old record
      await pool.query(
        'DELETE FROM religion WHERE Country = ? AND Name = ?',
        [countryCode, originalName]
      );
      
      // Then insert the new one
      await pool.query(
        'INSERT INTO religion (Country, Name, Percentage) VALUES (?, ?, ?)',
        [countryCode, religionName, religionPercentage]
      );
    } else {
      // Just update the percentage
      await pool.query(
        'UPDATE religion SET Percentage = ? WHERE Country = ? AND Name = ?',
        [religionPercentage, countryCode, religionName]
      );
    }
    
    revalidatePath(`/country/${countryName}`);
    revalidatePath(`/country/${countryName}/edit`);
    
  } catch (error) {
    console.error('Failed to update religion:', error);
    throw new Error(`Failed to update religion: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  // No redirect - we'll handle this client-side
}