import { NextFunction } from "express";
// import { getDepartmentBySlug, insertDepartment } from "../lib/db";


// export async function listDepartments(req: Request, res: Response, next: NextFunction) {
//     const departments = await getDepartments();

//     if (!departments){
//       return next(new Error('unable to get departments'));
//     }
  
//     return res.json(departments);
// }

// export async function getDepartment(req: Request, res: Response, next: NextFunction) {
//     const { slug } = req.params;

//     const department = await getDepartmentBySlug(slug);

//     if (!department) {
//         return next;
//     }

//     return res.json(department);
// }
// export async function createDepartmentHandler(req: Request, res: Response, next: NextFunction) {
//     const { title, description } = req.body;

//     const departmentToCreate = Omit<Department, 'id'> = {
//         title, 
//         slug: slugify(title),
//         description,
//         courses: [],
//     };

//     const createdDepartment = await insertDepartment(departmentToCreate, false);
    
//     if (!createdDepartment){
//         return next(new Error('unable to create debartment'));
//     }
//     return res.status(201).json(createdDepartment);
// }

// export const updateDepartment = [
//     stringValidator({ field: 'title', maxLength: 64, optional: true }),
//     stringValidator({
//         field: 'desciption',
//         valueRequired: false,
//         maxLength: 1000,
//         optional: true,
//     }),
//     atLeastOneBodyValueValidator(['title', 'description']),
//     xssSanitizer('title'),
//     xssSanitizer('description'),
//     validationCheck,
//     updateDepartmentHandler,
// ];

// export async function updateDepartmentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const {slug} = req.params;
//   const department = await getDepartmentBySlug(slug);

//   if (!department) {
//     return next();
//   }
// }

export async function createDepartment(req: Request, res: Response, next: NextFunction){ 

}

export async function deleteDepartment(req: Request, res: Response, next: NextFunction){

}