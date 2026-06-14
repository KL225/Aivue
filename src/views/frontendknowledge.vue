<template>
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" style="width: 60px; height: 60px;" />
                <h1>知识库</h1>
            </div>
        </div>
        <div class="content">
            <!-- 左侧菜单 -->
            <div class="recommend-section">
                <div class="section-title">目录</div>
                <div class="recommend-list">
                    <div  class="recommend-item">
                        <h4> 一、什么是心理健康？</h4>                     
                    </div>
                    <div  class="recommend-item">
                        <h4> 二、 心理健康的十大标准</h4>                     
                    </div>
                    <div  class="recommend-item">
                        <h4> 三、 常见心理问题的信号</h4>                     
                    </div>
                    <div  class="recommend-item">
                        <h4> 四、 日常心理调适的“五把钥匙”</h4>                     
                    </div>
                    <div  class="recommend-item">
                        <h4> 五、 何时该寻求专业帮助？</h4>                     
                    </div>
                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="article-list">
                <div class="article-item">
                    <h3>一、 什么是心理健康？</h3>
                    <p>很多人误以为“没有心理疾病就等于心理健康”。实际上，心理健康是一种高效而满意的、持续的<br>
                        心理状态，它包括：情绪的稳定、人际关系的和谐、良好的适应能力以及一定的抗压能力。真正<br>
                        的健康，是允许自己偶尔“生病”，但拥有“自愈”的弹性。
                    </p>
                </div>
                <div class="article-item">
                    <h3>二、 心理健康的十大标准</h3>
                    <p>美国心理学家马斯洛和米特尔曼曾提出经典的十条标准，至今依然适用：
                        <ul>
                            <li>1.充分的安全感；</li>
                            <li>2.充分了解自己，并恰当评价；</li>
                            <li>3.生活目标切合实际；</li>
                            <li>4.与现实环境保持接触；</li>
                            <li>5.保持个性的完整与和谐；</li>
                            <li>6.具有从经验中学习的能力；</li>
                            <li>7.保持良好的人际关系；</li>
                            <li>8.适度地发泄情绪和控制情绪；</li>
                            <li>9.在符合集体要求的前提下，有限度地发挥个性；</li>
                            <li>10.满足个人基本需求时，不违背社会规范。</li>
                        </ul>
                    </p>
                </div>
                <div class="article-item">
                    <h3>三、 常见心理问题的信号</h3>
                    <p><span>情绪极速滑坡：</span>持续两周以上的低落、空虚，或对什么都提不起兴趣。</p>
                    <p><span>躯体化反应：</span>查不出病因的头痛、胃痛、失眠或食欲突变。</p>
                    <p><span>认知功能下降：</span>记忆力明显减退，注意力难以集中，犹豫不决。</p>
                   <p><span>社交退缩：</span>不愿见人，不接电话，甚至无法完成日常洗漱。</p>
                </div>
                <div class="article-item">
                    <h3>四、 日常心理调适的“五把钥匙”</h3>
                    <p>1.<span>动起来：</span>每周3次30分钟的运动，能产生堪比抗抑郁药物的效果。</p>
                    <p>2.<span>说出来：</span>不要压抑情绪，找信赖的人倾诉，痛苦被分享后会减半。</p>
                    <p>3.<span>睡好觉：</span>睡眠是情绪的清洁工，固定作息比补觉更管用。</p>
                    <p>4.<span>正念呼吸：</span>当焦虑来袭，深吸气4秒，憋气4秒，缓慢呼气6秒，专注于这一呼一吸。</p>
                    <p>5.<span>接纳不完美：</span>允许自己搞砸，停止自我攻击。对自己说：“现在这样已经不容易了。”</p>
                </div>
                <div class="article-item">
                    <h3>五、 何时该寻求专业帮助？</h3>
                    <p>心理咨询不只是“看病”，更是“心灵健身”。如果心理困扰影响了你的社会功能（无法工作、学习、社交），<br>
                        或者你感到孤立无援，寻求心理咨询师或精神科医生的帮助，是一种非常勇敢且智慧的自我关怀。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getKnowledgeList } from '@/api/frontend'

const iconUrl = new URL('@/assets/images/book.png', import.meta.url).href


</script>
<style lang="scss" scoped>
.knowledge-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
    .flex-box {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;
        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .content {
        display: flex;
        gap: 20px;
        margin: 0 auto;
        width: 1200px;
        padding: 20px;
        .recommend-section {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 15px;
            height: 350px;
            .section-title {
                font-size: 12;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .recommend-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding-left: 10px;
                    margin-top: 20px;
                    cursor: pointer;
                }
            }
        }
        .article-list {
            flex: 1;
            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 15px;
                margin-bottom: 20px;
                span {
                    font-weight: bold
                }
                p {
                    margin: 10px 0 0 10px;
                }
            }
        }
    }
}
</style>