import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL: connectionString } = process.env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err:Error) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

type queryInput = string| number | null;

export async function query(q: string, values: Array<queryInput> = []) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    console.error('unable to query', e);
    console.info(q, values);
    return null;
  } finally {
    client.release();
  }
}

export async function poolEnd(){

}

// export async function getDepartmentBySlug(slug: string,): Promise<Department | null> {
//   const result = await query('SELECT * FROM department WHERE slug = $1', 
//   [slug,]);

//   if(!result) {
//     return null;
//   }
//   const department = departmentMapper(result.rows[0]);

//   return department;
// }

export async function deleteDepartmentBySlug(slug: string): Promise<boolean> {
  const result = await query('DELETE FROM department WHERe slug = $1', [slug]);

  if (!result) {
    return false;
  }
  return result.rowCount === 1;
}

export async function end() {
  await pool.end();
}

// export async function insertDepartment(department: Omit<Department: 'id'>, silent = false,): Promise<Department | null> {
//   const { title, slug, description } = department;
//   const result = await query(
//     'INSERT INTO department (title, slug, description) VALUES ($1, $2, $3) RETURNING id, title, slug, description, created, updated',
//     [title, slug, description],
//     silent,
//   );

//   const mapped = departmentMapper(result?.rows[0]);

//   return mapped;
// }

// export async function insertCourse(course: Omit<Course, 'id'>, departmentId: number, silent=false,):
// Promise<Course|null>{
//   const { title, units, semester, level, url, courseId } = course;
//   const result = await query(
//     'INSERT INTO course (title, units, semester, level, url, departmentID, courseID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//   [title, units, semester, level, url, departmentId, courseId], silent);

//   const mapped = courseMapper(result?.rows[0]);

//   return mapped;
// }