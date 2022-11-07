import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heroTitle: string =
    'Enjoy an incredible <span class="text-secondary-color">learning</span> experience';

  heroTitles = [
    {
      id: 1,
      text: 'Enjoy an incredible <span class="text-secondary-color">learning</span> experience',
    },
    {
      id: 2,
      text: 'Unleash your child’s <span class="text-secondary-color">inner</span> genius',
    },
    {
      id: 3,
      text: 'Life-long <span class="text-secondary-color">learning</span> begins here',
    },
  ];

  partners = [
    {
      id: 1,
      image: 'assets/img/partners/partner-1.jpg',
    },
    {
      id: 2,
      image: 'assets/img/partners/partner-2.png',
    },
    {
      id: 3,
      image: 'assets/img/partners/partner-3.png',
    },
    {
      id: 4,
      image: 'assets/img/partners/partner-4.png',
    },
    {
      id: 5,
      image: 'assets/img/partners/partner-5.jpg',
    },
    {
      id: 6,
      image: 'assets/img/partners/partner-6.png',
    },
    {
      id: 7,
      image: 'assets/img/partners/partner-7.png',
    },
    {
      id: 8,
      image: 'assets/img/partners/partner-8.png',
    },
    {
      id: 9,
      image: 'assets/img/partners/partner-9.png',
    },
  ];

  testimonials = [
    {
      id: 1,
      image: '../../../assets/img/testi/testi1.png',
      title: 'total quality and efficiency',
      description:
        'The more you use Dumena Tech LMS, the clearer it becomes that its total quality and efficiency exceed any of its particular capabilities.',
      name: 'Janet, Principal of Graceland High',
    },
    {
      id: 2,
      image: '../../../assets/img/testi/testi1.png',
      title: 'Second Testifier',
      description:
        'The more you use Dumena Tech LMS, the clearer it becomes that its total quality and efficiency exceed any of its particular capabilities.',
      name: 'Dave, Dumena',
    },
  ];

  news = [
    {
      id: 1,
      image: '../../../assets/img/news/news1.png',
      title: 'How to manage courses on the LMS and track your progress',
      details:
        'It’s one thing to enroll your child in school and the its another thing to be able to track and monitor he/her progress.',
      url: '',
    },
    {
      id: 2,
      image: '../../../assets/img/news/news2.png',
      title: 'Discover places to shop for the latest robotic tools',
      details:
        'It’s one thing to enroll your child in school and the its another thing to be able to track and monitor he/her progress.',
      url: '',
    },
    {
      id: 3,
      image: '../../../assets/img/news/news3.png',
      title: 'The effects of VR games on young teens today',
      details:
        'It’s one thing to enroll your child in school and the its another thing to be able to track and monitor he/ to go to in.',
      url: '',
    },
  ];

  dataRefresher: any;
  counter: number = 0;
  currentTesti: number = 0;
  showAds: boolean = true;

  ngOnInit(): void {
    this.refreshData();
  }

  // Fetch titles every 3 seconds
  refreshData() {
    this.dataRefresher = setInterval(() => {
      this.counter++;

      // loop through titles
      this.heroTitles.forEach((i: any) => {
        // compare id's and assign text to Hero title
        if (this.counter === i.id) {
          this.heroTitle = i.text;
        }
      });

      if (this.counter > 3) {
        this.counter = 0;
      }
    }, 3000);
  }

  previousTesti() {
    this.currentTesti--;
  }
  nextTesti() {
    this.currentTesti++;
  }
}
