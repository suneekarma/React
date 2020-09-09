class Student {
    constructor(name, email, community){
        this.name = name;
        this.email = email;
        this.community = community;
    }
}
class Bootcamp {
    constructor(name, level, students = []){
        this.name = name;
        this.level = level;
        this.students = students;
    }
    registerStudent(student){
    const check = this.students.filter(item => item.email === student.email);
    if(check.length === 0){
        this.students.push(student);
        console.log(`Registering ${student.email} to the bootcamp ${student.community}`);
        return;
    }
        console.log('Student email already exists');
    }

    totalStudents(){
        console.log(bootcamp.students);
    }
}

const student = new Student("john", "john@mail.com", "React");
const student2 = new Student("jim", "jim@mail.com", "Web");
const student3 = new Student("jess", "jess@mail.com", "Mobile Dev");
const bootcamp = new Bootcamp("nucamp", "full stack");

bootcamp.registerStudent(student);
bootcamp.registerStudent(student2);
bootcamp.registerStudent(student3);


bootcamp.totalStudents();