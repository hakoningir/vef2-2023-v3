
// export function parseJson(input: string): Array<DepartmentImport> {
//     let parsed: unknown;
//     try {
//         parsed = JSON.parse(input);
//     } catch (e) {
//         console.error('error parsing JSON', e);
//         return [];
//     }

//     if(!Array.isArray(parsed)) {
//         return [];
//     }

//     const item: Array<DepartmentImport> = [];
//     for (const i of parsed) {
//         const item = i as Partial<DepartmentImport>;
//         if(!item.title || !item.description || !item.csv) {
//             console.warn('missing required properties in JSON');
//         } else {
//             items.push({
//                 title: item.title,
//                 slug: slugify(item.title).toLowerCase(),
//                 description: item.description,
//                 csv: item.csv,
//             });
//         }
//     }

//     return items;
// }

// function parseLine(line: string): Omit<CountQueuingStrategy, 'id'> | null{
//     const [
//         id = undefined,
//         title = undefined,
//         lineUnits = undefined,
//         lineSemester = undefined,
//         lineLevel = undefined,
//         lineUrl = undefined
//     ] = line.split(';');

//     const formattedUnits = (lineUnits ?? '').replace(/\./g, '').
//     replace(',','.');
//     const parsedUnits = Number.parseFloat(formattedUnits);
//     const units = (lineUnits ?? '').indexOf('.') < 0 && 
//     !Number.isNaN(parsedUnits) &&
//     formattedUnits === parsedUnits.toString()
// }