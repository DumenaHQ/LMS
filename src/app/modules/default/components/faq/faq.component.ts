import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs = [
    {
      id: 1,
      question: 'How do I know these programs are suitable for my child?',
      answer: 'Our programs are custom-made for children between ages 5-18. We understand the learning needs of your child and we ensure that our courses and teaching system align with it.',
      hide: true
    },
    {
      id: 2,
      question: 'How do I support my child’s curiosity and learning as a parent?',
      answer: 'One of the most effective ways to do this is to create an interesting environment and encourage their interest in open-ended courses like coding and S.T.E.A.M',
      hide: true
    },
    {
      id: 3,
      question: 'Do you award certifications? ',
      answer: 'Yes, we do.',
      hide: true
    },
    {
      id: 4,
      question: 'What programs do you have tailored for Schools?',
      answer: 'All our current courses will be made available for your school. The courses include: S.T.E.A.M, Robotics, Entrepreneurship, Design Thinking, Coding, and Building Drones.',
      hide: true
    },
    {
      id: 5,
      question: 'What benefits will my School gain as a Partner?',
      answer: 'Apart from promoting your school on our platforms and increasing the credibility, your students will have exclusive access to our organized programs like Hackathons, competitions, and others. ',
      hide: true
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
