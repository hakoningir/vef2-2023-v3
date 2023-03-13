import dotenv from 'dotenv';
import { query, poolEnd } from '../lib/db';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parseCsv, parseJson } from '../lib/validation';

dotenv.config();

const schema = './sql/schema.db';
const drop = './sql/drop.db';
const dataDir = './data';

export async function createSchema(schemaFile = schema) {
    const data = await readFile(schemaFile);

    return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = drop) {
    const data = await readFile(dropFile);

    return query(data.toString('utf-8'));
}

async function setup(){
    const drop = await dropSchema();

    if(drop){
        console.info('Schema dropped');
    } else {
        console.info('Schema not dropped, exiting');
        poolEnd();
        return process.exit(-1);
    }

    const indexFile = await readFile(join(dataDir, 'index.json'));

    const indexData = parseJson(indexFile.toString('utf-8'));

    for(const item of indexData) {
        const csvFile = await readFile(join(dataDir, item.csv), {
            encoding: 'latin1',
        });

        const courses = parseCsv(csvFile);

        const department: Omit<Department, 'id'> = {
            title: item.title,
            slug: item.slug,
            description: item.description,
            courses: [],
        };
        const insertedDept = await insertDepartment(department, false);

        if (!insertedDept){
            console.error('unable to insert department', item);
            continue;
        }
        let validInserts = 0;
        let invalidInserts = 0;

        for (const course of courses) {
            const id = await insertCourse(course, insertedDept.id, true);
            if(id){
                validInserts++;
            } else {
                invalidInserts++;
            }
        }
        console.info(`Created department ${item.title} with 
        ${validInserts} courses and ${invalidInserts} invalid courses.`,);
    }

    await poolEnd();
}

setup().catch((err) => {
    console.error('error running setup', err);
    poolEnd();
});

// export function parseJson(input: string): Array<DepartmentImport> {
//     let parsed = unknown
//     return parsed;
// }