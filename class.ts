import studentClass from './student';
import instructorClass from './instructor';

interface classInterface{
    create(classData:classTypeData):classTypeData | string;
    saveClass(classData:classTypeData):boolean;
    findAllClass():classTypeData[];
    findByClass(id:string):classTypeData;
    findByStudent(name:string):classTypeData | string;
    findByInstructor(id:string):classTypeData;
    findByDataClass(data:string):classTypeData;
    updatedClass(id:string,data:classTypeData):classTypeData;
    removeClass(id:string):void;
    vinculateInstructor(idClass:string,idInstructor:string):void 
    getTypeTask(task:string):typeTask
}
interface classTypeData{
    id:string,
    instructor_id:string,
    student_id:string,
    qtde_student:number,
    hour_classroom:string,
    initial_date:Date,
    date_final:Date,
    class_duration:number,
    type_task:typeTask,
    created_at:Date,
    updated_at:Date
}

export default class classClass implements classInterface{
    constructor(
        private student:studentClass,
        private instructor:instructorClass,
        private classes:classTypeData[]
    ){}
create(classData: classTypeData): classTypeData  | string{
    const classe:classTypeData = {
        class_duration:classData.class_duration,
        date_final:classData.date_final,
        hour_classroom:classData.hour_classroom,
        id:classData.id,
        initial_date:classData.initial_date,
        instructor_id:classData.instructor_id,
        qtde_student:classData.qtde_student,
        student_id:classData.student_id,
        type_task:typeTask.type1,
        created_at: new Date,
        updated_at: new Date
    }

    const save = this.saveClass(classe)
    const classeSave = save?classe: "Erro ao salvar classe";
    return classeSave;
}

saveClass(classData: classTypeData): boolean {
    try {
       this.classes.push(classData)
       return true
    } catch (error) {
        return false
    }
}

findAllClass(): classTypeData[] {
    return this.classes;
}

findByClass(id: string): classTypeData {
    const classesId = this.classes.map(classes => classes.id)
    const position = classesId.indexOf(id)

    return this.classes[position]
}

findByStudent(name: string): classTypeData | string{
    
    const student = this.student.findByName(name)
    if(student){
        const studentsIdClass = this.classes.map(classes => classes.student_id)
        const position = studentsIdClass.indexOf(student.id)
        return this.classes[position]
    }else{
        return "Estudante nao encontrado em nenhuma classe"
    }
}

findByDataClass(data: string): classTypeData {
    const classesData = this.classes.map(classes => classes.initial_date)
    const position = classesData.indexOf(new Date(data))
    return this.classes[position]
}

findByInstructor(id: string): classTypeData {
    const instructor = this.instructor.findById(id)
    const classe = this.classes.map(classes => classes.instructor_id)
    const position = classe.indexOf(instructor.id)

    return this.classes[position]
}

updatedClass(id:string,data: classTypeData): classTypeData {
    const classesIds = this.classes.map(classe => classe.id)
    const position = classesIds.indexOf(id)

    this.classes[position].class_duration = data.class_duration
    this.classes[position].date_final = data.date_final
    this.classes[position].hour_classroom = data.hour_classroom
    this.classes[position].initial_date = data.initial_date
    this.classes[position].instructor_id = data.instructor_id
    this.classes[position].qtde_student = data.qtde_student
    this.classes[position].student_id = data.student_id
    this.classes[position].type_task = this.getTypeTask(data.type_task)
    return this.instructor[position]
}
vinculateInstructor(idClass:string,idInstructor: string): void {
    const classesId = this.classes.map(classes => classes.id)
    const position = classesId.indexOf(idClass)

    this.classes[position].instructor_id = idInstructor
}
getTypeTask(task:string):typeTask {
    for (const key in typeTask) {
        if (Object.prototype.hasOwnProperty.call(typeTask, key)) {
            const element = typeTask[key];
            if(element === task){
                return element
            }
        }
    }
    return typeTask.type1
}
removeClass(id: string): classTypeData {
    const classesId = this.classes.map(classe => classe.id);
    const position = classesId.indexOf(id);

    const removed = this.classes.splice(position, 1);
    return removed[0]
}
}


enum typeTask {
    type1 = 'TYPE1',
    type2 = 'TYPE2'
}