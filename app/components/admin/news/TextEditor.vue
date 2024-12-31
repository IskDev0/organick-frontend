<script setup lang="ts">
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu'
import {Button} from "~/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import {Editor, EditorContent} from '@tiptap/vue-3'

interface Props {
  modelValue?: string
}

const {modelValue} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

const editor = ref<Editor>()

watch(() => modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})

onMounted(() => {

  console.log(modelValue);

  editor.value = new Editor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
    ],
    content: modelValue,
    onUpdate: () => {
      emit('update:modelValue', editor.value?.getHTML())
    },
    editorProps: {
      attributes: {
        class: "dark:!bg-zinc-900"
      }
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div v-if="editor">
    <div class="flex items-center flex-wrap gap-2 p-2 border rounded-t-lg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor!.chain().focus().toggleBold().run()"
              :disabled="!editor?.can().chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor?.isActive('bold') }">
              <Icon name="mdi:format-bold"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }">
              <Icon name="mdi:format-italic"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
              <Icon name="mdi:format-strikethrough"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Strike</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().unsetAllMarks().run()">
              <Icon name="material-symbols:format-clear"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear formatting</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().clearNodes().run()">
              <Icon name="mdi:delete"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }">
              <Icon name="mdi:format-paragraph"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Paragraph</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <Icon name="lucide:heading"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  <button>
                    H1
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  <button>
                    H2
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  <button>
                    H3
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                  <button>
                    H4
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                  <button>
                    H5
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                                  :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                  <button>
                    H6
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }">
              <Icon name="mdi:format-list-bulleted"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bullet list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }">
              <Icon name="mdi:format-list-numbered"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ordered list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('blockquote') }">
              <Icon name="mdi:format-quote-close"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Blockquote</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().setHorizontalRule().run()">
              <Icon name="material-symbols:horizontal-rule"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Horizontal rule</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().setHardBreak().run()">
              <Icon name="material-symbols:insert-page-break-outline-rounded"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Line break</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
              <Icon name="mdi:undo"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
              <Icon name="mdi:redo"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <EditorContent class="text-red-500" :editor="editor"/>
  </div>
</template>

<style>
.tiptap {
  padding: 16px;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  min-height: 300px;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  font-weight: bold;
  color: #333;
}

.tiptap h1 {
  font-size: 2rem;
}

.tiptap h2 {
  font-size: 1.75rem;
}

.tiptap h3 {
  font-size: 1.5rem;
}

.tiptap h4 {
  font-size: 1.25rem;
}

.tiptap h5 {
  font-size: 1rem;
}

.tiptap h6 {
  font-size: 0.875rem;
}

.tiptap p {
  line-height: 1.6;
  color: #444;
}

.tiptap ul,
.tiptap ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.tiptap ul {
  list-style-type: disc;
}

.tiptap ol {
  list-style-type: decimal;
}

.tiptap ul li,
.tiptap ol li {
  margin: 0.5rem 0;
}

.tiptap pre {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'JetBrainsMono', monospace;
}

.tiptap blockquote {
  margin: 2rem 0;
}

.tiptap hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2rem 0;
}

.tiptap mark {
  background-color: #ffeb3b;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.tiptap p:first-child {
  margin-top: 0;
}
</style>
