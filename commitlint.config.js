module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 项目文档或注释变更
        'style', // 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'refactor', // 代码重构，没有加新功能或者修复bug
        'perf', // 优化相关，比如提升性能、体验
        'test', // 增加测试
        'chore', // 改变构建流程、或者增加依赖库、工具等
        'revert', // 回滚到上一个版本
        'build'// 部署版本
      ]
    ],
    'subject-case': [0]
  }
}
