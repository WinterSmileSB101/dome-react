https://www.jianshu.com/p/8195b73319da
https://blog.csdn.net/Peerless__/article/details/110386388

# 内置变量

TM_SELECTED_TEXT 当前选定的文本或空字符串
TM_CURRENT_LINE 当前行的内容
TM_CURRENT_WORD 光标下的内容或空字符串
TM_LINE_INDEX 从零开始的当前行号
TM_LINE_NUMBER 从一开始的当前行号
TM_FILENAME 当前文档的文件名
TM_FILENAME_BASE 基当前文档的文件名，不带扩展名
TM_DIRECTORY 当前文档的目录
TM_FILEPATH 当前文档的完整文件路径
CLIPBOARD 剪贴板的内容
WORKSPACE_NAME 打开的工作区或文件夹的名称

日期:
CURRENT_YEAR 当前年份
CURRENT_YEAR_SHORT 当前年份的最后两位数字
CURRENT_MONTH 两位数的当前月份（例如“02”）
CURRENT_MONTH_NAME 当前月份的英文全名（例如’July’）
CURRENT_MONTH_NAME_SHORT 当前月份的英文短名称（例如’Jul’）
CURRENT_DATE 今天几号
CURRENT_DAY_NAME 英文的星期几（例如’Monday’）
CURRENT_DAY_NAME_SHORT 英文星期几的短名称（例如’Mon’）
CURRENT_HOUR 24 小时制的当前小时
CURRENT_MINUTE 当前分钟
CURRENT_SECOND 当前秒
CURRENT_SECONDS_UNIX 自格林威治时间以来的秒数(1970 年 1 月 1 日)

注释:
BLOCK*COMMENT_START 区块注释开始 <!--
BLOCK_COMMENT_END    区块注释结束 -->
在 php 中会变成/*和\_/
LINE_COMMENT 单行注释: PHP 中: //

文字转换(正则)
${TM_FILENAME/[\\.]/_/}    将文件名中的.换成_
${TM*FILENAME/[\\.-]/*/g} 将文件名中的.和-换成\_
${TM_FILENAME/(.*)/${1:/upcase}/} 将文件名完全转为大写
${TM_FILENAME/[^0-9^a-z]//gi} 删除非字母和数字的字符,包括符号
