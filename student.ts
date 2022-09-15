interface IStudentInterface{
    create(studentData: IStudent):IStudent;
    saveStudent():void;
    findAllStudent():IStudent[];
    findByClass(classNumber: number):IStudent[];
    findByName(name: string):IStudent | undefined;
    updatedStudent(id: string, studentData: IStudent):IStudent;
    removeStudent(id: string):IStudent;
}
interface IStudent{
    id: string;
    name:string,
    address_id:string,
    phone:string,
    birth_day:Date,
    height:number,
    weight:number,
    type_student:typeStudent,
    classes: number[]; // Para representar as turmas matriculadas
    created_at:Date,
    updated_at:Date
}


enum typeStudent {
    default = 'DEFAULT',
    monitor = 'MONITOR'
}

export default class StudentClass implements IStudentInterface{
    constructor(private students: IStudent[]) {}

    create(studentData: IStudent): IStudent {

        const student: IStudent = {
            id: studentData.id,
            name: studentData.name,
            address_id: studentData.address_id,
            birth_day: studentData.birth_day,
            height: studentData.height,
            phone: studentData.phone,
            type_student: studentData.type_student,
            weight: studentData.weight,
            classes: studentData.classes,
            created_at: new Date(),
            updated_at: new Date(),
        }
        this.students.push(student)
        return student;
    }

    saveStudent(): void {
        return;
    }

    findAllStudent(): IStudent[] {
        return this.students;
    }

    findByClass(classNumber: number): IStudent[] {
        return this.students.filter(student => student.classes.includes(classNumber))
    }
    
    findByName(name: string): IStudent | undefined {
    return this.students.find(student => student.name === name)
    }

    updatedStudent(id: string, studentData: IStudent): IStudent {
        const studentsId = this.students.map(student => student.id);

        const position = studentsId.indexOf(id);

        this.students[position].name = studentData.name;
        this.students[position].address_id = studentData.address_id;
        this.students[position].birth_day = studentData.birth_day;
        this.students[position].classes = studentData.classes;
        this.students[position].height = studentData.height;
        this.students[position].phone = studentData.phone;
        this.students[position].type_student = studentData.type_student;
        this.students[position].weight = studentData.weight;

        return this.students[position];
    }
    removeStudent(id: string): IStudent {
        const studentsId = this.students.map(student => student.id);
        const position = studentsId.indexOf(id);

        const removed = this.students.splice(position, 1);
        return removed[0]
    }
   
}