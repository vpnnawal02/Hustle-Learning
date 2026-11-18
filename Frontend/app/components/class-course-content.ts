/**
 * Long-form SEO content for per-class course pages (/courses/class-6 …).
 * Added class by class — classes without an entry keep the compact layout.
 */

export interface ClassFeaturedCourse {
  name: string;
  body: string[];
  subjects: string[];
  /** Shown only when present (e.g. Class 6 Hindi medium). */
  medium?: string;
  focus: string[];
  /** Course id used to build the enrol link. */
  courseId: string;
}

export interface ClassCourseContent {
  slug: string;
  /** Page H1. */
  h1: string;
  /** Intro paragraphs shown above the course cards. */
  intro: string[];
  exploreHeading: string;
  exploreBody: string[];
  featuredCourses: ClassFeaturedCourse[];
  subjects: { name: string; body: string[] }[];
  whyPoints: { title: string; body: string }[];
  whoCanJoin: string[];
  enrolSteps: string[];
  faqs: { q: string; a: string }[];
  /** Optional closing H2 (e.g. Class 7). */
  closingHeading?: string;
  closing: string[];
}

export const CLASS_COURSE_CONTENT: Record<string, ClassCourseContent> = {
  "class-6": {
    slug: "class-6",
    h1: "Online Classes for Class 6 CBSE Students",
    intro: [
      "Give your child a stronger start to middle-school education with Class 6 online courses at Hustle Learning. Designed around school-level academic requirements, our courses help students understand important concepts, strengthen subject knowledge and develop effective learning habits.",
      "Class 6 introduces students to new concepts, more detailed topics and a broader academic curriculum. Building a clear understanding at this stage makes it easier for students to approach higher classes with confidence.",
      "At Hustle Learning, students can explore online courses covering Mathematics, Science, English, Hindi and Social Science. With structured teaching, subject-focused learning and live online batches, we aim to make learning more accessible, organised and effective.",
    ],
    exploreHeading: "Explore Class 6 Courses",
    exploreBody: [
      "Choose from our available Class 6 learning programmes based on your child's subjects and learning requirements.",
      "Our courses cover the major school subjects and focus on helping students develop a better understanding of their academic curriculum.",
    ],
    featuredCourses: [
      {
        name: "CBSE Class 6 Full Year Course",
      body: [
        "A comprehensive learning programme covering the major subjects studied in Class 6.",
        "The course brings together important school subjects to help students develop a balanced understanding of their curriculum throughout the academic year.",
      ],
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
      medium: "Hindi",
      focus: [
        "Understanding fundamental concepts",
        "Developing subject knowledge",
        "Strengthening academic foundations",
        "Building confidence in school subjects",
      ],
        courseId: "class-6-all-subjects",
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        body: [
          "Develop mathematical thinking and problem-solving abilities with Class 6 Mathematics courses.",
          "Students explore fundamental mathematical concepts, numerical operations, patterns, geometry and other important topics that form the foundation for higher-level mathematics.",
          "The focus is on understanding mathematical principles, applying concepts and developing accuracy while solving problems.",
        ],
      },
      {
        name: "Science",
        body: [
          "Explore the world of science through fundamental concepts and scientific observations.",
          "Class 6 Science introduces students to important topics related to living organisms, materials, motion, light, electricity and the environment.",
          "The learning approach focuses on developing curiosity, understanding scientific principles and connecting classroom concepts with everyday life.",
        ],
      },
      {
        name: "English",
        body: [
          "Build a stronger foundation in English through reading, writing, grammar and comprehension.",
          "Students develop their language skills, improve vocabulary and learn to express their thoughts more clearly through written and spoken English.",
        ],
      },
      {
        name: "Hindi",
        body: [
          "Strengthen Hindi language skills through grammar, comprehension, writing and literature.",
          "Students develop a better understanding of the language while improving their ability to read, write and communicate effectively in Hindi.",
        ],
      },
      {
        name: "Social Science",
        body: [
          "Understand the world around you through History, Geography and Social and Political Life.",
          "Class 6 Social Science introduces students to important historical developments, geographical concepts, communities, society and the functioning of institutions.",
          "The focus is on developing awareness, understanding important concepts and building an interest in the world around us.",
        ],
      },
    ],
    whyPoints: [
      {
        title: "Structured learning",
        body: "A more organised approach to studying school subjects, helping students understand their curriculum systematically.",
      },
      {
        title: "Concept-based teaching",
        body: "Focus on understanding concepts and developing subject knowledge instead of relying entirely on memorisation.",
      },
      {
        title: "Live online batches",
        body: "Learn through structured online teaching sessions designed for school students.",
      },
      {
        title: "Multiple subjects under one platform",
        body: "Explore Mathematics, Science, English, Hindi and Social Science courses in one place.",
      },
      {
        title: "Strong academic foundations",
        body: "Develop the fundamental knowledge and learning habits needed for future academic progress.",
      },
    ],
    whoCanJoin: [
      "Students currently studying in Class 6.",
      "Students following the CBSE curriculum.",
      "Students who want additional academic support.",
      "Students who want to strengthen their understanding of school subjects.",
      "Parents looking for structured online learning opportunities for their children.",
    ],
    enrolSteps: [
      "Explore the available Class 6 courses.",
      "Select the course that matches your learning requirements.",
      "Review the course details and applicable fees.",
      "Complete the enrolment process.",
      "Start learning with Hustle Learning.",
    ],
    faqs: [
      {
        q: "Does Hustle Learning offer online classes for Class 6?",
        a: "Yes. Hustle Learning offers online learning programmes for Class 6 students, including live online batch classes.",
      },
      {
        q: "Which subjects are available for Class 6?",
        a: "Students can explore Mathematics, Science, English, Hindi and Social Science courses.",
      },
      {
        q: "Are the Class 6 courses based on the CBSE curriculum?",
        a: "Our Class 6 courses are designed around school-level academic requirements. Refer to the individual course details for specific syllabus coverage.",
      },
      {
        q: "Is there a full-year course for Class 6?",
        a: "Yes. Students can explore the CBSE Full Year Course, which covers multiple core subjects.",
      },
      {
        q: "What is the medium of instruction for the Class 6 Full Year Course?",
        a: "The Class 6 CBSE Full Year Course is offered in Hindi medium.",
      },
      {
        q: "Are live online classes available for Class 6?",
        a: "Hustle Learning offers live online batches. Check the individual course details for the applicable batch schedule and availability.",
      },
      {
        q: "Can students enrol in individual subjects?",
        a: "Refer to the available Class 6 course listings for individual subject and combined-course enrolment options.",
      },
      {
        q: "How can I check the fees for Class 6 courses?",
        a: "The applicable fees are displayed in the respective course details — currently ₹499/- per month or ₹5000/- per year. Students and parents can review the pricing before enrolling.",
      },
      {
        q: "Who should enrol in Class 6 online courses?",
        a: "These courses are suitable for students studying in Class 6 who want structured academic learning and additional support in their school subjects.",
      },
    ],
    closing: [
      "Class 6 is the beginning of an important stage in school education. A strong understanding of fundamental concepts can make a significant difference in how students approach future academic challenges.",
      "Explore Class 6 courses at Hustle Learning and discover a more structured way to learn Mathematics, Science, English, Hindi and Social Science.",
    ],
  },
  "class-7": {
    slug: "class-7",
    h1: "Online Classes for Class 7 CBSE Students",
    intro: [
      "Make learning more effective with Class 7 online courses at Hustle Learning. Designed to support students through an important stage of middle-school education, our courses focus on developing conceptual understanding, strengthening subject knowledge and building confidence across different academic subjects.",
      "Class 7 introduces students to more detailed concepts, advanced topics and new ways of approaching academic problems. Developing a clear understanding of these concepts helps students prepare for the increasing academic requirements of higher classes.",
      "At Hustle Learning, students can explore online courses in Mathematics, Science, English, Hindi and Social Science. Our structured learning programmes and live online batches aim to make academic learning more organised, accessible and engaging.",
    ],
    exploreHeading: "Explore Class 7 Courses",
    exploreBody: [
      "Choose from the available Class 7 learning programmes based on your preferred subjects and learning requirements.",
      "Our courses cover major school subjects and focus on developing a strong understanding of the concepts included in the academic curriculum.",
    ],
    featuredCourses: [
      {
        name: "CBSE Class 7 Full Year Course",
      body: [
        "A comprehensive learning programme covering the major subjects studied in Class 7.",
        "The course brings together important school subjects to help students develop a balanced understanding of their curriculum and maintain consistency in their academic learning.",
      ],
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
      focus: [
        "Strengthening fundamental concepts",
        "Developing analytical and logical thinking",
        "Improving subject knowledge",
        "Building confidence in academic learning",
        "Preparing for higher academic levels",
      ],
        courseId: "class-7-full-syllabus",
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        body: [
          "Develop mathematical understanding and improve problem-solving skills with Class 7 Mathematics courses.",
          "Students explore concepts involving integers, fractions, rational numbers, algebraic expressions, geometry, data handling and other important mathematical topics.",
          "The learning approach focuses on understanding mathematical operations, applying formulas correctly and developing logical approaches to solving problems.",
        ],
      },
      {
        name: "Science",
        body: [
          "Discover scientific concepts and understand how the world around us works.",
          "Class 7 Science introduces students to important concepts related to nutrition, heat, motion, electricity, physical and chemical changes, living organisms and the environment.",
          "Our learning approach focuses on developing scientific curiosity, understanding fundamental principles and connecting scientific concepts with everyday experiences.",
        ],
      },
      {
        name: "English",
        body: [
          "Improve English language skills through reading, writing, grammar and comprehension.",
          "Students develop their vocabulary, strengthen grammatical understanding and learn to communicate their ideas more effectively.",
          "The course focuses on improving reading comprehension, written expression, language accuracy and understanding of literary texts.",
        ],
      },
      {
        name: "Hindi",
        body: [
          "Develop stronger Hindi language skills through grammar, comprehension, writing and literature.",
          "Students improve their understanding of Hindi grammar, develop their vocabulary and learn to express their thoughts clearly through written and spoken communication.",
        ],
      },
      {
        name: "Social Science",
        body: [
          "Understand society, history, geography and the world around us.",
          "Class 7 Social Science introduces students to important historical developments, geographical concepts, environmental processes and social and political institutions.",
          "The course focuses on developing historical understanding, geographical awareness and the ability to interpret and explain important social concepts.",
        ],
      },
    ],
    whyPoints: [
      {
        title: "Structured learning",
        body: "Follow an organised learning approach that helps students understand their subjects and progress through their academic curriculum.",
      },
      {
        title: "Concept-based teaching",
        body: "Focus on understanding the reasoning behind concepts rather than relying entirely on memorisation.",
      },
      {
        title: "Live online batches",
        body: "Learn through structured online teaching sessions designed for school students.",
      },
      {
        title: "Multiple subjects under one platform",
        body: "Explore Mathematics, Science, English, Hindi and Social Science courses in one place.",
      },
      {
        title: "Preparation for higher classes",
        body: "Develop the subject knowledge, analytical thinking and problem-solving skills needed for future academic progress.",
      },
    ],
    whoCanJoin: [
      "Students currently studying in Class 7.",
      "Students following the CBSE curriculum.",
      "Students who want additional academic support.",
      "Students looking to improve their understanding of school subjects.",
      "Parents looking for structured online learning opportunities for their children.",
    ],
    enrolSteps: [
      "Explore the available Class 7 courses.",
      "Select the course that matches your learning requirements.",
      "Review the course details and applicable fees.",
      "Complete the enrolment process.",
      "Start learning with Hustle Learning.",
    ],
    faqs: [
      {
        q: "Does Hustle Learning offer online classes for Class 7?",
        a: "Yes. Hustle Learning offers online learning programmes for Class 7 students, including live online batch classes.",
      },
      {
        q: "Which subjects are available for Class 7?",
        a: "Students can explore Mathematics, Science, English, Hindi and Social Science courses.",
      },
      {
        q: "Are the Class 7 courses based on the CBSE curriculum?",
        a: "Our Class 7 courses are designed around school-level academic requirements. Refer to individual course details for specific syllabus coverage.",
      },
      {
        q: "Is there a full-year course for Class 7?",
        a: "Students can explore the available full-year learning programmes covering multiple core subjects. Check the course listing for current availability.",
      },
      {
        q: "Are live online classes available for Class 7?",
        a: "Hustle Learning offers live online batches. Check the individual course details for applicable batch schedules and availability.",
      },
      {
        q: "Can students study all five subjects together?",
        a: "Students can explore combined subject programmes and available course combinations. Refer to the individual course details for enrolment options.",
      },
      {
        q: "How much do Class 7 online courses cost?",
        a: "Course fees depend on the selected learning programme. The applicable pricing is available in the respective course details.",
      },
      {
        q: "Who should enrol in Class 7 online courses?",
        a: "These courses are suitable for students studying in Class 7 who want structured academic learning and additional support in their school subjects.",
      },
    ],
    closingHeading: "Build Stronger Foundations with Hustle Learning",
    closing: [
      "Class 7 is an important stage in a student's academic development. As concepts become more detailed and subjects require deeper understanding, developing strong fundamentals becomes increasingly important.",
      "Hustle Learning brings together class-wise online courses and subject-focused learning opportunities to help students approach their academic journey with greater confidence.",
      "Explore Class 7 courses and discover a more structured way to learn Mathematics, Science, English, Hindi and Social Science.",
    ],
  },
  "class-8": {
    slug: "class-8",
    h1: "Online Classes for Class 8 CBSE Students",
    intro: [
      "Prepare for the next stage of school education with Class 8 online courses at Hustle Learning. Our learning programmes are designed to help students strengthen their academic foundations, understand important concepts and develop the skills required for secondary-level education.",
      "Class 8 is an important year in a student's academic journey. Subjects become more detailed, concepts require deeper understanding and students need to develop stronger analytical, logical and communication skills.",
      "At Hustle Learning, students can explore structured online courses covering Mathematics, Science, Social Science, English and Hindi. Whether you want to improve your problem-solving abilities, understand scientific concepts or develop stronger language skills, our courses provide focused learning opportunities for different academic needs.",
    ],
    exploreHeading: "Explore Class 8 Courses",
    exploreBody: [
      "Choose from our subject-focused and combined learning programmes.",
    ],
    featuredCourses: [
      {
        name: "Mathematics & Science Excellence",
        body: [
          "Build a strong foundation in Mathematics and Science with a combined learning programme designed for Class 8 students.",
          "Mathematics develops logical reasoning, numerical understanding and problem-solving abilities, while Science helps students understand important scientific principles and their applications in everyday life.",
          "This course focuses on strengthening conceptual understanding across both subjects and preparing students for the increasing academic requirements of higher classes.",
        ],
        subjects: ["Mathematics", "Science"],
        focus: [
          "Mathematical concepts and problem-solving",
          "Scientific principles and applications",
          "Logical and analytical thinking",
          "Conceptual understanding",
          "Preparation for higher classes",
        ],
        courseId: "class-8-maths-science",
      },
      {
        name: "Social Science Scholars",
        body: [
          "Understand the world around you through History, Geography and Social and Political Life.",
          "Social Science helps students develop an understanding of historical events, geographical processes, social institutions and the relationships between people and their surroundings.",
          "This course focuses on developing subject knowledge, improving analytical thinking and helping students understand and explain important concepts.",
        ],
        subjects: ["History", "Geography", "Social and Political Life"],
        focus: [
          "Understanding historical developments",
          "Developing geographical awareness",
          "Learning about society and institutions",
          "Understanding important social and political concepts",
          "Improving analytical and descriptive skills",
        ],
        courseId: "class-8-social-science",
      },
      {
        name: "Language Excellence",
        body: [
          "Develop stronger communication and language skills through a combined English and Hindi learning programme.",
          "Language Excellence focuses on improving reading comprehension, grammar, vocabulary, writing abilities and understanding of literature in both languages.",
          "The programme helps students express their thoughts more effectively and develop greater confidence in academic communication.",
        ],
        subjects: ["English", "Hindi"],
        focus: [
          "Grammar and vocabulary",
          "Reading comprehension",
          "Writing and expression",
          "Language accuracy",
          "Understanding literary texts",
        ],
        courseId: "class-8-language",
      },
    ],
    subjects: [
      {
        name: "Mathematics",
        body: [
          "Develop mathematical understanding and improve your ability to approach different types of problems.",
          "Class 8 Mathematics introduces students to more advanced numerical, algebraic and geometrical concepts. A clear understanding of these topics helps students develop the mathematical foundation required for higher classes.",
          "The learning approach focuses on logical reasoning, accurate calculations, understanding mathematical relationships and applying concepts to solve problems.",
        ],
      },
      {
        name: "Science",
        body: [
          "Explore scientific concepts and understand the principles behind everyday phenomena.",
          "Class 8 Science covers important areas of Physics, Chemistry and Biology, helping students understand physical processes, materials, living organisms and their interactions with the environment.",
          "The focus is on conceptual clarity, scientific reasoning and connecting theoretical knowledge with real-world applications.",
        ],
      },
      {
        name: "Social Science",
        body: [
          "Develop a broader understanding of history, geography and society.",
          "Through History, Geography and Social and Political Life, students explore historical developments, geographical processes, resources, institutions and social relationships.",
          "The course encourages students to understand important concepts, analyse information and develop a better awareness of the world around them.",
        ],
      },
      {
        name: "English",
        body: [
          "Improve language proficiency through grammar, vocabulary, reading comprehension and writing.",
          "Students work towards developing clearer communication, better written expression and a stronger understanding of literary content.",
        ],
      },
      {
        name: "Hindi",
        body: [
          "Strengthen Hindi language skills through grammar, comprehension, writing and literature.",
          "Students develop their understanding of language structure, improve vocabulary and learn to communicate their thoughts more effectively.",
        ],
      },
    ],
    whyPoints: [
      {
        title: "Structured learning",
        body: "Explore organised courses that help students approach their school subjects systematically.",
      },
      {
        title: "Concept-based teaching",
        body: "Focus on understanding concepts and their applications instead of relying entirely on memorisation.",
      },
      {
        title: "Live online batches",
        body: "Learn through structured online teaching sessions designed for school students.",
      },
      {
        title: "Combined subject programmes",
        body: "Study related subjects together through Mathematics & Science and English & Hindi programmes.",
      },
      {
        title: "Subject-focused learning",
        body: "Choose a learning programme according to your academic requirements and areas of interest.",
      },
      {
        title: "Preparation for secondary education",
        body: "Develop the fundamental knowledge, reasoning abilities and learning habits required for Classes 9 and 10.",
      },
    ],
    whoCanJoin: [
      "Students currently studying in Class 8.",
      "Students following the CBSE curriculum.",
      "Students who want to strengthen their subject knowledge.",
      "Students looking for additional academic support.",
      "Students preparing for the transition to secondary education.",
      "Parents looking for structured online learning programmes for their children.",
    ],
    enrolSteps: [
      "Explore the available Class 8 courses.",
      "Select Mathematics & Science, Social Science or Language Excellence.",
      "Review the course details and applicable fees.",
      "Complete the enrolment process.",
      "Start learning with Hustle Learning.",
    ],
    faqs: [
      {
        q: "Does Hustle Learning offer online classes for Class 8?",
        a: "Yes. Hustle Learning offers online learning programmes for Class 8 students, including live online batch classes.",
      },
      {
        q: "Which courses are available for Class 8?",
        a: "Students can explore Mathematics & Science Excellence, Social Science Scholars and Language Excellence.",
      },
      {
        q: "Does Hustle Learning offer Mathematics and Science together?",
        a: "Yes. Mathematics and Science are available as a combined learning programme for Class 8 students.",
      },
      {
        q: "Are English and Hindi taught together?",
        a: "Yes. Students can explore Language Excellence, a combined programme covering English and Hindi.",
      },
      {
        q: "Which subjects are covered in Class 8 Social Science?",
        a: "Social Science covers History, Geography and Social and Political Life.",
      },
      {
        q: "Are the Class 8 courses based on the CBSE curriculum?",
        a: "Hustle Learning's courses are designed around school-level academic requirements. Refer to individual course details for specific syllabus coverage.",
      },
      {
        q: "Are live online classes available for Class 8?",
        a: "Hustle Learning offers live online batches. Refer to individual course details for current schedules and availability.",
      },
      {
        q: "Can students enrol in individual courses?",
        a: "Students can explore the available course combinations and enrol in programmes according to their learning requirements.",
      },
      {
        q: "How much do Class 8 online courses cost?",
        a: "The fees depend on the selected course. Refer to individual course listings for applicable pricing.",
      },
      {
        q: "Why is Class 8 important for students?",
        a: "Class 8 helps students strengthen their understanding of fundamental concepts and prepare for the more detailed curriculum introduced in Classes 9 and 10.",
      },
    ],
    closingHeading: "Prepare for the Next Stage with Hustle Learning",
    closing: [
      "Class 8 is more than just another school year. It is an opportunity to strengthen fundamental concepts, improve learning habits and prepare for the academic challenges ahead.",
      "With subject-focused courses in Mathematics, Science, Social Science, English and Hindi, Hustle Learning provides students with structured learning opportunities under one platform.",
      "Explore our Class 8 courses and take the next step towards stronger academic foundations.",
    ],
  },
};

export function getClassCourseContent(
  slug: string,
): ClassCourseContent | undefined {
  return CLASS_COURSE_CONTENT[slug];
}
