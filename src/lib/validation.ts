import { param } from 'express-validator';
import { body } from 'express-validator/src/middlewares/validation-chain-builders.js';
import { valueToSementer } from '../lib/mappers.js';
import { updateDepartmentHandler } from '../routes/departments.js';
import type { Course, DepartmentImport } from '../setup/types';


/**
 * Parse JSON data representing index files.
 * @param input string with JSON data
 * @returns parsed list of files
 */
export function parseJson(input: string): Array<DepartmentImport> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    console.error('error parsing JSON', e);
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const items: Array<DepartmentImport> = [];
  for (const i of parsed) {
    const item = i as Partial<DepartmentImport>;
    if (!item.title || !item.description || !item.csv) {
      console.warn('missing required properties in JSON');
    } else {
      items.push({
        title: item.title,
        slug: slugify(item.title).toLowerCase(),
        description: item.description,
        csv: item.csv,
      });
    }
  }

  return items;
}

function parseLine(line: string): Omit<Course, 'id'> | null {
  const [
    id = undefined,
    title = undefined,
    lineUnits = undefined,
    lineSemester = undefined,
    lineLevel = undefined,
    lineUrl = undefined,
  ] = line.split(';');

  const formattedUnits = (lineUnits ?? '').replace(/\./g, '').replace(',', '.');
  const parsedUnits = Number.parseFloat(formattedUnits);
  const units =
    (lineUnits ?? '').indexOf('.') < 0 &&
    !Number.isNaN(parsedUnits) &&
    formattedUnits === parsedUnits.toString()
      ? parsedUnits
      : undefined;

  const semester = valueToSementer(lineSemester);

  const level =
    typeof lineLevel === 'string' && lineLevel.length ? lineLevel : undefined;

  let url;

  try {
    url = new URL(lineUrl ?? '').href;
  } catch (e) {
    // do nothing if URL is invalid
  }

  if (!id || !title || !semester) {
    /*
    console.warn(`missing required properties`, {
      id: Boolean(id),
      title: Boolean(title),
      semester: Boolean(semester),
    });
    */
    return null;
  }

  return {
    courseId: id,
    title,
    units,
    semester,
    level,
    url,
  };
}

/**
 * Parse CSV data for a course.
 * @param {string} data string with CSV data
 * @returns {Array<Course>} parsed list of courses
 */
export function parseCsv(data: string) {
  if (!data) {
    return [];
  }

  const courses = [];
  const lines = data.split('\n').slice(1);

  for (const line of lines) {
    const parsed = parseLine(line);

    if (parsed) {
      courses.push(parsed);
    } else {
      // console.warn(`error parsing line`, { line });
    }
  }

  return courses;
}

export const stringValidator = ({
  field = '',
  valueRequired = true,
  maxLength = 0,
  optional = false,
} = {}) => {
  const val = body(field)
  .trim()
  .isString()
  .isLength({
    min: valueRequired ? 1 : undefined,
    max: maxLength ? maxLength : undefined,
  })
  .withMessage(
    [
      field,
      valueRequired ? 'required' : '',
      maxLength ? `max ${maxLength} characters` : '',
    ]
    .filter((i) => Boolean(i))
    .join(' '),
  );
  if (optional) {
    return val.optional();
  }
  return val;
}

export const updateDepartment = [
  stringValidator({ field: ' title', maxLength: 64, optional: true }),
  stringValidator({
    field: 'description', 
    valueRequired: false,
    maxLength: 1000,
    optional: true,
  }),
  updateDepartmentHandler,
];