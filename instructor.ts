interface instructorInterface{
    create(instructorData:IInstructor):IInstructor | string;
    saveInstructor(instructorData:IInstructor):boolean | string;
    findAllInstructor():IInstructor[];
    findByDocument(document:string):IInstructor;
    findById(id:string): IInstructor;
    updatedInstructor(id:string,instructorData:IInstructor):IInstructor;
    removeInstructor(id:string):IInstructor;
}
interface IInstructor{
    id:string;
    name:string,
    document:string,
    title:string,
    phone:string[],
    created_at:Date,
    updated_at:Date
}

export default class InstructorClass implements instructorInterface{
    constructor(private instructor:IInstructor[]){}
    create(instructorData:IInstructor):IInstructor | string {
        const instructor:IInstructor = {
            id:instructorData.id,
            document:instructorData.document,
            name:instructorData.name,
            phone:instructorData.phone,
            title:instructorData.title,
            created_at:new Date,
            updated_at:new Date 
        }
        const instructorSave = this.saveInstructor(instructor)
        if (instructorSave) {
            return this.instructor[0]
        }
        return 'Erro ao salvar instrutor';
    }

    saveInstructor(instructorData:IInstructor): boolean {
        try {
        this.instructor.push(instructorData)
        return true;
        } catch (error) {
            return false
        }
    }

    findAllInstructor(): IInstructor[] {
        return this.instructor;
    }

    findByDocument(document:string): IInstructor {
        return this.instructor.filter(instructor => instructor.document.includes(document))[0]
    }
    findByName(name:string): IInstructor {
        return this.instructor.filter(instructor => instructor.name.includes(name))[0]
    }

    findById(id:string): IInstructor {
        return this.instructor.filter(instructor => instructor.id.includes(id))[0]
    }
    updatedInstructor(id:string,instructorData:IInstructor): IInstructor {
        const instructorIds = this.instructor.map(instructor => instructor.id)
        const position = instructorIds.indexOf(id)

        this.instructor[position].name = instructorData.name
        this.instructor[position].document = instructorData.document
        this.instructor[position].phone = instructorData.phone
        this.instructor[position].title = instructorData.title

        return this.instructor[position]

    }
    removeInstructor(id:string): IInstructor {
        const instructorId = this.instructor.map(instructor => instructor.id)
        const position = instructorId.indexOf(id)

        const removed = this.instructor.splice(position,1)
        return removed[0]

    }
}
