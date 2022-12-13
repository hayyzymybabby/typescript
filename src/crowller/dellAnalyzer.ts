import fs from 'fs'
import { load } from 'cheerio'
import { Analyzer } from './index'

interface Course {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class DellAnalyzer implements Analyzer {
  private getCourseInfo(html: string) {
    const courseInfos: Course[] = []

    const $ = load(html)
    const courseItems = $('.course-item')
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1])
      courseInfos.push({
        title,
        count
      })
    })
    const result = {
      time: new Date().getTime(),
      data: courseInfos
    }
    return result
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }
}

export default DellAnalyzer
